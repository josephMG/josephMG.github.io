---
layout: blog
title: "[Day 6] Google Video Intelligence AI - 1"
date: 2019-09-14 07:29:27
tags: ["Google AI", "Video Intelligence AI", "鐵人賽"]
author: Joseph
categories: ["Joseph", "AI & Machine Learning"]
---
今天的文章開始第二個AI產品[Google Video AI](https://cloud.google.com/video-intelligence/)。這是一套影片辨析的AI工具，跟Vision AI一樣你可以用[AutoML Video Intelligence](https://cloud.google.com/video-intelligence/automl/docs/quickstart-console)圖形化介面工具訓練，也可以使用[Video Intelligence API](https://cloud.google.com/video-intelligence/docs/quickstart)幫助我們解析影片。

那我們就先來看他能解析什麼東西吧。先從[Try](https://cloud.google.com/video-intelligence/#video-intelligence-api-demo)這邊進去，去開始授權你的帳號。
![try.jpg](try.jpg)
<!-- more -->

接著選擇一部影片以後，讓他跑完每一秒，這邊我選Style Detection。
![analysing.jpg](analysing.jpg)

...跑跑跑...跑跑跑...這次學乖了早點跑。有趣的是我們不用等他跑完才看到結果，跑一陣子以後就能開始分析內容了，可以透過切換上方的Labels、Shots、Explicit Content看看每個分類底下的分析結果。

- Labels:
![Labels.jpg](Labels.jpg)
這邊給了**整部影片**一個sunglasses的Label，另外也有shot-level的資訊，因為不見得每個shot都有sunglasses。

- Shots: 
![shot-labels.jpg](shot-labels.jpg)
Shot-level就可以看到每個shot分析出來的資訊，有哪些Label、每個Label的可能性。有點像是每一秒拿去Vision AI一樣。

- Explicit Content:
![Explicit-content.jpg](Explicit-content.jpg)
整部影片含有不雅的資訊的可能性，這邊偵測出非常不可能(VERY_UNLIKELY)是Pornography，不過仔細看也是會有幾個shot跳到UNLIKELY。

- API
![API.jpg](API.jpg)
API的部分則是回傳這部影片分析的JSON檔案，可以看到包含Labels, Shots, Exlipicit Content的資訊都在裡面，搜尋sunglasses的話也可以找到多個內容(其中一個是整部影片的Labels，其他的則是shots裡的資訊)。


這邊就是Video Intelligence試玩的結果，也是今天這篇文章的結束。
明天來玩看看API的部分，希望一切順利。
