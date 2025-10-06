---
title: '[Day 16] BMAD-Method - Creative Writing'
tags: ['astro', 'blog']
author: Joseph
category: 'AI & Machine Learning'
publishDate: 2025-09-30 23:53:25
image: 'banner.png'
---

今天講的是BMad-Method裡面的一個工具包 `Creative-writer` ，他也是有提供 `agents`, `checklists`, `tasks`, `templates`, `workflows`這些組成BMad-Method的組件，定位上是配備專門用於小說、劇本創作和敘事設計。
今天來看看這個工具包的用途。

<!-- more -->

### TOC

### Agents

這邊總共包含了10個Agents

```
  核心寫作團隊

   1. 情節架構師 (Plot Architect) - 結構、節奏和敘事曲線設計
   2. 角色心理學家 (Character Psychologist) - 深度角色發展和心理學
   3. 世界建構師 (World Builder) - 設定、宇宙和環境建立
   4. 編輯 (Editor) - 修飾風格、語法、一致性和流暢度
   5. 試讀者 (Beta Reader) - 模擬第一讀者視角和反饋

  專業代理

   6. 對話專家 (Dialog Specialist) - 潤飾對話、語氣和交流技巧
   7. 敘事設計師 (Narrative Designer) - 互動化講述故事和分支
   8. 類型專家 (Genre Specialist) - 類型慣例、理念和市場意識
   9. 書評家 (Book Critic) - 對於文學做專業分析和評論
   10. 封面設計師 (Cover Designer) - 書籍封面概念和視覺敘事
```

隔行如隔山，一個寫作有這麼多不同的分工在裡面。

### Checklists

這跟之前跑的checklist滿類似的，各式各樣的checklist共有37個，檢查故事有沒有按照checklist發展，確保符合預設的標準。

| 清單 ID                                 | 中文名稱               | 主要目的                                                  |
| --------------------------------------- | ---------------------- | --------------------------------------------------------- |
| beta-feedback-closure-checklist         | 試讀回饋完成清單       | 確保所有試讀者的回饋筆記都已被處理或有意識地推遲。        |
| character-consistency-checklist         | 角色一致性清單         | 確保角色的細節和話風在手稿中保持一致。                    |
| comedic-timing-checklist                | 喜劇節奏與幽默清單     | 確保喜劇段落能服務於角色或情節。                          |
| cyberpunk-aesthetic-checklist           | 賽博龐克美學一致性清單 | 科技用語和社會經濟主題的一致性。                          |
| ebook-formatting-checklist              | 電子書格式化清單       | 確保手稿已可發行於 Kindle/EPUB 格式。                     |
| epic-poetry-meter-checklist             | 史詩格律與形式清單     | 史詩格律、詩行長度和詩歌技巧。                            |
| fantasy-magic-system-checklist          | 奇幻魔法系統一致性清單 | 保持魔法設定的連貫性。                                    |
| foreshadowing-payoff-checklist          | 伏筆與回收清單         | 伏線的回收，沒有懸而未決的線索。                          |
| genre-tropes-checklist                  | 類型常規（Tropes）清單 | 該類型所需類型套語是否有適度運用。                        |
| historical-accuracy-checklist           | 歷史準確性清單         | 細節（如服裝、語言、科技）是否準確。                      |
| horror-suspense-checklist               | 恐怖/懸疑緊張感清單    | 升級劇情緊張感和有效的懸念點。                            |
| kdp-cover-ready-checklist               | KDP 封面準備就緒清單   | 合 Amazon KDP 印刷規格。                                  |
| line-edit-quality-checklist             | 逐行編輯品質清單       | 行文流暢度、語法和格式。                                  |
| marketing-copy-checklist                | 行銷文案清單           | 使文案具吸引力和專業性。                                  |
| mystery-clue-trail-checklist            | 懸疑小說線索設置清單   | 讓讀者不易猜中，且誤導性線索設置合理。                    |
| orbital-mechanics-checklist             | 硬科幻軌道力學清單     | 航道、燃料預算和時間科學合理性。                          |
| plot-structure-checklist                | 故事結構清單           | 尾韻和故事核心部分的完整性（主目標、元敘事等）。          |
| publication-readiness-checklist         | 出版就緒清單           | 追蹤文檔格式、稿件格式、出版告白等。                      |
| romance-emotional-beats-checklist       | 浪漫情感節奏清單       | 不可少的情感拍點（如初遇、告白、分手等）。                |
| scene-quality-checklist                 | 場景品質清單           | 品質審查，確保每場景有明確敘述目的和前後呼應。            |
| scifi-technology-plausibility-checklist | 科幻技術合理性清單     | 技術設定是否有憑可查且與故事內部邏輯一致。                |
| sensitivity-representation-checklist    | 敏感性與性別代表清單   | 主題、角色與情節的呈現是否合宜。                          |
| steampunk-gadget-checklist              | 蒸汽/魔安裝置清單      | 蒸汽設定能涵蓋多亞時代技術邏輯。                          |
| thriller-pacing-stakes-checklist        | 驚悚/小說節奏風險清單  | 驚悚級的風險，讓讀者保持緊張感。                          |
| timeline-continuity-checklist           | 時間線連貫性清單       | 節和章節在故事中保持連貫。                                |
| world-building-continuity-checklist     | 世界觀連貫性清單       | 確保其規則和價值觀在故事中持續連貫。                      |
| ya-appropriateness-checklist            | 青少年文學適宜性清單   | 確保其語言、內容和尺度符合青少年（Young Adult）讀者市場。 |

當然這也是不同agent負責的，也都會記錄在KB知識庫裡面

### Tasks

每個任務都有個目標，把這些小目標一個一個達成，然後再丟入checklist裡檢查，已完成一件著作。

| 編號 | 任務 ID                 | 中文名稱           | 主要目的                                           |
| ---- | ----------------------- | ------------------ | -------------------------------------------------- |
| 1    | brainstorm-premise      | 腦力激盪故事前提   | 快速生成並提煉單句的故事核心概念（log-line）。     |
| 2    | expand-premise          | 擴展故事前提       | 擴展故事前提成一個段落的摘要。                     |
| 3    | expand-synopsis         | 擴展故事大綱       | 擴展段落摘要成完整故事大綱。                       |
| 4    | build-world             | 建立世界觀         | 創建包含社群、文化、歷史等世界觀指南。             |
| 5    | develop-character       | 發展角色           | 產出包含目標、缺點、角色動機等細節的角色設定檔案。 |
| 6    | character-depth-pass    | 角色深度塑造       | 為角色檔案增補背景故事、內心衝突等深度細節。       |
| 7    | analyze-story-structure | 分析故事結構       | 全面分析故事結構、節奏、伏筆與回收，找出改進點。   |
| 8    | generate-scene-list     | 生成場景列表       | 將故事大綱拆分成編號獨立場景。                     |
| 9    | outline-scenes          | 組織場景大綱       | 場景列表組合成章節並標示出幕式結構。               |
| 10   | create-draft-section    | 起草章節           | 根據大綱草擬完整章節或場景。                       |
| 11   | workshop-dialog         | 對白工作坊         | 精煉對白，使其更真實、符角色並具戲劇效果。         |
| 12   | provide-feedback        | 提供回饋           | 模擬讀者 (beta-reader) 角色對章節提供意見。        |
| 13   | quick-feedback          | 快速回饋           | 對章節或節奏概念的快速回饋。                       |
| 14   | analyze-reader-feedback | 分析讀者回饋       | 總結讀者評語，辨別趨勢並調整故事方向。             |
| 15   | incorporate-feedback    | 整合回饋           | 整合讀者修改建議到手稿中。                         |
| 16   | final-polish            | 最終潤飾           | 進行修正查核，提升風格和清晰度。                   |
| 17   | critical-review         | 專業評審           | 對稿件進行一次全面專業戲劇評審。                   |
| 18   | generate-cover-brief    | 生成封面設計簡報   | 生成封面設計所需創意及技術參數。                   |
| 19   | generate-cover-prompts  | 生成封面圖像提示詞 | 為 AI 生成封面圖作產生提示詞（prompt）。           |
| 20   | assemble-kdp-package    | 組裝 KDP 上傳包    | 準備 Amazon KDP 平台發佈所需完整封面檔案等。       |
| 21   | publish-chapter         | 發布章節           | 格式化並發佈章節內容。                             |
| 22   | select-next-arc         | 選擇下一故事弧     | 根據讀者回饋決定故事連載下一情節走向。             |
| 23   | advanced-elicitation    | 進階引導           | 結構化提問技術深度挖掘和提煉內容提升品質。         |
| 24   | create-doc              | 從範本創建文件     | 與用戶互動方式從範本生成完整文件。                 |
| 25   | execute-checklist       | 執行檢查清單       | 根據檢查清單逐條核對稿件是否符合標準。             |
| 26   | kb-mode-interaction     | 知識庫互動模式     | 定義在知識庫模式下如何與用戶互動提供資訊。         |

Creative-Writer這工具讓BMad-Method不只能寫code，還能搖身一變成專業的作者。但我沒什麼寫作天賦，就先不嘗試使用它了。等之後有靈感再來看要應用在哪。

今天到這邊就結束囉，喜歡我文章的再幫忙推廣一下喔！
