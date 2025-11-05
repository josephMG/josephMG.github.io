---
title: '[Day 30] BMAD-Method Summary'
tags: ['AI', 'GenAI', 'AI agents']
author: Joseph
category: 'AI & Machine Learning'
publishDate: 2025-10-30 08:30:24
image: 'banner.png'
---

花了好幾天的token，昨天做完[Flutter記帳軟體](./day-29-bmad-method-accounting-app-flutter-3)以後，終於來到第30篇文章，最後一篇了，來總結一下我們的BMad-Method文吧。

<!-- more -->

### TOC

### 專案踩到的坑

- ios計算機: [Day-5](./day-5-bmad-method-with-opencode-ios-calculator/), [Day-6](./day-6-bmad-method-with-opencode-ios-calculator-v2/)
  這是我第一次安裝XCode，第一次開始寫Swift，也是我第一次開始使用BMad-Method開始做東西。剛開始碰會對流程非常不熟悉，即便文件有讀、影片有看，但真的套進來還是很多地方跟Demo上的不一樣，AI Model與AI Agents工具也有一定的影響，在這初次的實作裡建立對工具的熟悉感就特別重要。剛開始碰我覺得下面三件事情很重要：

1. 用既有的產品開始讓BMAD-Method做，他也比較有東西可以參考、我們也學比較快
2. 開始去熟悉BMAD-Method的流程、專注他的status變化，然後盡可能用Prompt完成
3. 練習幫助Agent去Debug的方法，複製錯誤訊息跟截圖貼給AI Agent看，會遠比打一堆prompt還要有用

- 前後端分離專案：[Day-8](./day-8-bmad-method-fastapi-backend-and-user-management/), [Day-9](./day-9-bmad-method-fastapi-backend-v2/), [Day-10](./day-10-bmad-method-integrate-frontend/), [Day-11](./day-11-bmad-method-integrate-frontend-part-2/)
  這是後端用Python FastAPI, 前端用ReactJS完成的full stack 個人資料管理Dashboard，基本的會員管理功能這邊都有。這案子比較有趣的是先讓他規劃後端Story （Greenfield），然後才整合前端story （Brownfield），也是跌得很慘。唯一慶幸跟前面`ios計算機`有個很大不同的點，在這案子裡我FastAPI + ReactJS都滿熟悉的。這邊我的建議有下面幾個：

1. 前後端分離的案子一定要同個feature前後端一起進開發（註冊前後端、登入前後端...），如果隔了太遠，少了context上下文的智慧，很容易整個feature就歪掉了
2. type-defined很重要，可以幫助Agent更快理解問題。（這點跟人也一樣～）
3. 案子大了一點，有缺的功能記得要開story去做，這樣就有文件、修改紀錄、跟測試結果，後續比較好追蹤

然後再按照前一個案子的經驗去debug，就可以順利修完bug、做完features了。

- Flutter雙平台記帳工具：[Day-17](./day-17-bmad-method-accounting-app-flutter-1/), [Day-18](./day-18-bmad-method-accounting-app-flutter-2/), [Day-29](./day-29-bmad-method-accounting-app-flutter-3/)
  這開按到實作完成，做了有夠久，然後還沒有上架（！）
  這也是我第一次玩Flutter，從第一天安裝、第二天生文件、很多天燒token開發，學到的東西真的很多。讓我娓娓道來：

1. 多個terminal，因為每個Agent不需要知道其他Agent的上下文，這時候會發現一個terminal開QA+SM、另一個terminal跑Dev，不用切來切去，這樣效率快很多。
2. 善用model，雞蛋不要放同一個籃子裡，跑到後來我QA都用`Gemini-2.5-flash`、Dev都用`Gemini-2.5-pro`，文件類的就讓Gemini-2.5-flash去燒token吧！
3. 有時候AI agent會當機，這邊我就`Gemini CLI` + `OpenCode`交互使用，一個當掉就換另外一個（或者重開治百病

三個project跑完就對BMAD-Method熟悉很多了，剩下的只是`哪個AI agent厲害`、`哪個CLI tool好用`跟`怎麼樣token燒比較少`的問題了。

### v6-alpha

中間一堆篇幅介紹了`v4`版本裡各個core component的文件內容結構，分析怎麼做出一個agent, task, workflow，結果`v6-alpha`直接把template直接做出來，透過`BMB builder`給我們build自己的去創建自己的module，而且`v6-alpha`針對上下文理解強化、使用者客製化提供彈性、甚至framework可自動隨著專案規模擴張而調整，這些都比`v4`這個好用的工具**更好用**。雖然他還是`alpha`版本，未來可能還會有重大變更，但相信他只能變更好用而已了吧（？）

雖然現在還沒有案子在跑`v6-alpha`，但只要有機會我一定會想辦法導入他的。

### Spec Driven Development (SDD)

近期也有很多很火紅的SDD工具，像是[Spec kit](https://github.com/github/spec-kit) 跟 [Open Spec](https://github.com/Fission-AI/OpenSpec)，這兩個我也都還沒用過，我就先用LLM來幫我整理一份介紹吧：

---

> prompt:
>
> - SpecKit: https://github.com/github/spec-kit
> - OpenSpec: https://github.com/Fission-AI/OpenSpec
> - BMad-Metod: https://github.com/bmad-code-org/BMAD-METHOD
>   請幫我介紹這三個工具、比較他們的差異

##### 差異比較

| 特性             | SpecKit                                | OpenSpec                                   | BMad-Method                                          |
| :--------------- | :------------------------------------- | :----------------------------------------- | :--------------------------------------------------- |
| **核心概念**     | 人類可讀的活文檔                       | 機器可讀的任務規格                         | AI 驅動的敏捷開發框架                                |
| **主要目標**     | 確保程式碼與規格一致                   | 指導 AI Agent 完成任務                     | 規模化地管理 AI 代理開發                             |
| **抽象層級**     | **較低**：專注於單個功能的規格與測試。 | **中等**：定義一個可由 AI 執行的獨立任務。 | **最高**：提供包含多代理、多工作流程的完整系統架構。 |
| **目標用戶**     | 開發者、測試工程師                     | AI Agent、AI 工程師                        | 企業架構師、AI 團隊、專案經理                        |
| **與 AI 的關係** | 利用 AI **輔助**人類開發（基於規格）。 | 為 AI **提供**清晰的執行指令。             | 將 AI 作為**核心開發團隊成員**進行組織和管理。       |

##### 總結

- **SpecKit** 像是「帶有測試功能的藍圖」，確保建築（軟體）符合設計圖（規格）。
- **OpenSpec** 像是給「AI 建築工人」的「施工指令」，告訴它要蓋什麼、怎麼驗收。
- **BMAD-Method** 則是整個「建築公司」的「營運手冊」，定義了從接到案子、設計、施工到交付的完整流程，以及每個角色（AI 代理）的職責。

您可以根據您的需求選擇最適合的工具：

- 如果想改善團隊的開發流程，確保規格和實作同步，請看 **SpecKit**。
- 如果您正在開發或使用 AI Agent 來自動化編碼，需要一個標準格式來給它下指令，請看 **OpenSpec**。
- 如果您想建構和管理一個複雜的多代理 AI 系統，並需要一套完整的企業級方法論，請看 **BMAD-Method**。

---

光看文件確實也覺得BMAD-Method怎麼會這麼複雜、使用個工具還要搞懂他的流程圖、有的沒有的一堆。但用起來讓你覺得那很像是一次跟很多人一起工作一樣，雖然複雜、但比單純下指令有趣的多。

BMad-Method這系列就到這邊結束了，想看project的可以到[這邊](https://github.com/josephMG/bmad-method-projects)。

喜歡我的文章可以再幫忙推廣、或透過LinkedIn聯繫喔！
