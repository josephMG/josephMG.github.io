---
title: '在 Linux 上把新硬碟掛載成 /data (含舊資料無痛搬移)'
tags: ['Linux', 'Disk Mount', 'rsync', 'ext4']
author: Joseph
category: DevOps
publishDate: 2026-06-19 00:00:00
image: 'banner.png'
---

當系統根目錄(`/`)空間快滿時,常見做法是加一顆新硬碟,把吃空間的資料(資料庫、容器 volume、image…)放到新盤的 `/data`。本文示範**如何把一顆全新硬碟格式化、掛載成 `/data`,並把原本 `/data` 裡的資料完整搬過去而不遺失**。

<!-- more -->

<!-- toc -->

## 情境與目標

- 系統碟(假設是 `sdb`)空間吃緊。
- 新增一顆閒置硬碟 `sda`,要拿來當 `/data`。
- 原本根目錄底下已經有 `/data`(裡面有現存資料),希望搬到新盤後**路徑完全不變**,服務不用改設定。

## Step 0:確認硬碟現況

```bash
lsblk          # 看磁碟與分割區
df -h          # 看目前掛載狀況
```

範例輸出:

```
NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
sda      8:0    0 119.2G  0 disk
└─sda1   8:1    0 119.2G  0 part            ← 有分割區，但 MOUNTPOINTS 是空的
sdb      8:16   0 119.2G  0 disk
├─sdb1   8:17   0   512M  0 part /boot/efi
└─sdb2   8:18   0 111.3G  0 part /
```

`sda1` 的 MOUNTPOINTS 空白 = **沒掛載**,所以 `df` 看不到它。

## Step 1:檢查新分割區有沒有檔案系統

```bash
sudo blkid /dev/sda1
sudo file -s /dev/sda1
```

如果 `blkid` **只顯示 PARTUUID、沒有 `UUID` 和 `TYPE`**,`file -s` 顯示 `data`,代表這是**空白、未格式化**的分割區 —— 這正是它掛不上的原因(上面沒有檔案系統)。

## Step 2:格式化

建立 ext4 檔案系統,並給一個好認的 label:

```bash
sudo mkfs.ext4 -L data /dev/sda1
```

> ⚠️ `mkfs` 會清空整個分割區。執行前務必確認這顆盤是空的、沒有要保留的資料。

格式化後再看一次,會多出 `UUID` 與 `TYPE=ext4`:

```bash
sudo blkid /dev/sda1
# /dev/sda1: LABEL="data" UUID="2617e96b-..." TYPE="ext4" PARTUUID="..."
```

把這個 **UUID 記下來**,後面 fstab 要用。

## Step 3:停掉正在使用 `/data` 的服務

搬移前先停服務,避免邊搬邊寫造成資料不一致:

```bash
# 依你的服務調整，例如：
cd /opt/your-service && sudo docker-compose down
```

## Step 4:把舊 `/data` 內容搬到新盤

先把新盤暫時掛到別處,用 `rsync` 完整複製:

```bash
sudo mkdir -p /mnt/newdata
sudo mount /dev/sda1 /mnt/newdata

sudo rsync -aHAX --info=progress2 /data/ /mnt/newdata/

sudo ls /mnt/newdata        # 確認內容都搬過去了
sudo umount /mnt/newdata
```

`rsync` 參數說明:

| 參數               | 作用                                             |
| ------------------ | ------------------------------------------------ |
| `-a`               | 封存模式:遞迴 + 保留權限、時間、擁有者、符號連結 |
| `-H`               | 保留硬連結                                       |
| `-A`               | 保留 ACL                                         |
| `-X`               | 保留延伸屬性(xattr)                              |
| `--info=progress2` | 顯示整體進度                                     |

> 來源 `/data/` 結尾的 **`/` 很關鍵**:代表複製「裡面的內容」到目標。少了斜線會多包一層資料夾。

## Step 5:正式把新盤掛到 `/data`

舊資料夾先改名備份(不要急著刪),再把新盤掛上:

```bash
sudo mv /data /data.old
sudo mkdir /data
sudo mount /dev/sda1 /data

df -h /data          # 應看到新盤的容量
sudo ls /data        # 內容應與搬移前一致
```

## Step 6:設定開機自動掛載(fstab)

用 **UUID**(比 `/dev/sda1` 穩定,不會因裝置順序變動而跑掉):

```bash
echo 'UUID=2617e96b-... /data ext4 defaults,nofail 0 2' | sudo tee -a /etc/fstab
sudo mount -a        # 驗證 fstab 沒寫錯，不報錯即 OK
```

> 建議加 **`nofail`**:萬一這顆盤日後拔除或故障,開機才不會卡在掛載失敗。

## Step 7:重啟服務並驗證

```bash
cd /opt/your-service && sudo docker-compose up -d
```

因為 `/data` 路徑完全沒變,服務的設定(volume 路徑等)**都不用改**,直接啟動即可。確認服務正常、資料都在之後,再刪掉備份釋放空間:

```bash
sudo rm -rf /data.old
```

## 重點整理

- `df` 只列「已掛載」的檔案系統;分割區沒格式化、沒掛載就看不到。
- 全新分割區要先 `mkfs` 才能掛。
- 搬系統資料用 `rsync -aHAX` 保留完整權限/屬性,比 `cp` 安全。
- fstab 用 **UUID + `nofail`** 最穩。
- 先 `mv` 備份再切換,確認無誤才刪,最大限度避免資料遺失。
