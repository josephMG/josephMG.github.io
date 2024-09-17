---
title: "[Day 30] Google AI & ML Products 系列總結"
publishDate: 2019-10-08 07:30:26
tags: ["Google AI", "Speech-to-Text", "鐵人賽"]
author: Joseph
category: "AI & Machine Learning"
---
這系列文章出自於一個無窮無盡的bug的解題時間，想不到如何解bug、又想不出要寫什麼主題，參考完大家的方向以後，我發現這類型的文章很少、又很實用，才下定決心透過鐵人賽推廣 **Google AI & ML Products**。

在這次的挑戰裡，給了自己三個目標：
1. 更熟悉docker
2. 開始玩Golang
3. 入門大部分的Google AI & ML Products
但也因為Google AI & ML Products太多了，所以把它分了很多子系列進行，現在再來回顧一下這次的內容。

> 前面先來個提醒，如果過程中你們有Deploy model做Online predict的，如果測完一定要記得刪掉，不然你deploy的model就會一直被收費喔。
<!-- more -->

### 靈感的噴發、給大家的預告
- [[Day 1] 說說哪裡來的靈感](./ithelp-2019-day1)
去年就寫了很淺的Google MLCC，今年再次來推廣Google的AI & ML Products，先做了一下功課到底有那些一定要做，然後每天每天慢慢寫。

### Google Vision AI
- [[Day 2] Google Vision AI - 1](./ithelp-2019-day2)
- [[Day 3] Google Vision AI - 2](./ithelp-2019-day3)
- [[Day 4] Google Vision AI - 3](./ithelp-2019-day4)
- [[Day 5] Google Vision AI - 子系列最終章](./ithelp-2019-day5)
這系列是講Google Vision AI，這隻API可以掃描圖片，並萃取出我們需要的資訊，像是文字、物件、色系之類的，以前要用電腦視覺寫各式各樣的演算法處理，現在透過一個API搞定。

> 從這邊開始幾乎奠定了以後的文章架構：第一天動手玩了TRY，第二天、第三天則用Golang玩Vision AI，最後一天如果這個AI也有AutoML的話，就是操作AutoML的UI介面。

### Google Video Intelligence AI
- [[Day 6] Google Video Intelligence AI - 1](./ithelp-2019-day6)
- [[Day 7] Google Video Intelligence AI - 2](./ithelp-2019-day7)
- [[Day 8] Google Video Intelligence AI - 3](./ithelp-2019-day8)
- [[Day 9] Google Video Intelligence AI - 子系列最終章](./ithelp-2019-day9)
影片分析的AI產品，這個真的很好玩，把一部影片丟進去就能依照影格分析資訊，有點像是一直呼叫一直呼叫Vision AI，但速度又很快很順，實在讓人難以理解。

### Google Natural Language
- [[Day 10] Google Natural Language - 1](./ithelp-2019-day10)
- [[Day 11] Google Natural Language - 2](./ithelp-2019-day11)
- [[Day 12] Google Natural Language - 3](./ithelp-2019-day12)
- [[Day 13] Google Natural Language - 子系列最終章](./ithelp-2019-day13)
這系列是介紹自然語言的分析AI，一段文字進去會分析語意、結構、情緒。而且除了整段文字分析，還能分小段落解析，是一個很方便的工具。

### Google Translation
- [[Day 14] Google Translation - 1](./ithelp-2019-day14)
- [[Day 15] Google Translation - 2](./ithelp-2019-day15)
- [[Day 16] Google Translation - 3](./ithelp-2019-day16)
- [[Day 17] Google Translation - 子系列最終章](./ithelp-2019-day17)
我們很常用的Google翻譯，在這邊也是一個AI產品，除了分析是哪一國語言、還可以選擇要翻譯成哪種語言。這邊更有趣的是用`Go`串了`REST API`，去解決`v3beta1`沒有提供Go Library的問題。

### Text to Speech
- [[Day 18] Google Cloud Text-to-Speech - 1](./ithelp-2019-day18)
- [[Day 19] Google Cloud Text-to-Speech - 2](./ithelp-2019-day19)
- [[Day 20] Google Cloud Text-to-Speech - 子系列最終章](./ithelp-2019-day20)
文字轉語音的服務，這服務在各種案子想解決視覺不便者問題都很常見，現在有API可以串接是很方便的一件事情。
> 這邊沒有AutoML可以玩

### Speech to Text
- [[Day 21] Google Cloud Speech-to-Text - 1](./ithelp-2019-day21)
- [[Day 22] Google Cloud Speech-to-Text - 2](./ithelp-2019-day22)
- [[Day 23] Google Cloud Speech-to-Text - 子系列最終章](./ithelp-2019-day23)
這跟上面相反，是把語音轉文字，甚至可以設定多位講者分別轉換成對應的文字，我覺得這類服務也可以有很多應用，除了可以人double check機器聽的正確與否，對一些聽力不佳的使用者也很實用。

### Dialogflow
- [[Day 24] Google Dialogflow - 1](./ithelp-2019-day24)
- [[Day 25] Google Dialogflow - 2](./ithelp-2019-day25)
Dialogflow讓客服的工作可以輕鬆一點，先用一些flow去導引User到它想要去的地方，真的不行的再最後給客服，玩了以後更能體會Google助理到底在幹嘛了。

> 這系列開始趕了進度，怕後面的文章不夠塞，所以把內容縮減成兩篇

### AutoML Table
- [[Day 26] Google AutoML Table - 1](./ithelp-2019-day26)
- [[Day 27] Google AutoML Table - 2](./ithelp-2019-day27)
你有大筆的資料想分析可是不知道該怎麼分析嗎？這個服務可以讓你匯入資料，簡簡單單看一下AI的train、evaluate、跟predict，要改善也有一些參數讓你設定，真的要優化可以再做後續處AI處理。

### AI Hub
- [[Day 28] Google AI Hub - 1](./ithelp-2019-day28)
- [[Day 29] Google AI Hub - 2](./ithelp-2019-day29)
上面說要優化再後續處理，就是這邊。這個平台集結了很多AI & ML服務，可以讓我們很快的部屬、測試，甚至還有colab可以給我們做優化，並做出自己的AI。除此之外，也可以分享我們的AI給其他人使用，是個很好的平台。

OK 以上就是這次的總結，希望大家看完這系列以後也能很快了解自己的需求要怎麼用AI解決、以及要用哪些AI服務解決。

> 每個系列的Code可以在我的Github找到：https://github.com/josephMG/ithelp-2019 
> 我分成了各個tag方便大家尋找。
