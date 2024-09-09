---
title: "[Day 1] 說說哪裡來的靈感"
date: 2019-09-09 07:29:15
tags: ["Google AI", "AI & ML products", "鐵人賽"]
author: Joseph
categories: ["Joseph", "AI & Machine Learning"]
---
這系列的第一篇文章，來自於再解一個無窮無盡SSR的bug的時間。
去年的鐵人賽文章[跟著Google學ML](https://ithelp.ithome.com.tw/users/20103835/ironman/1806) 生不逢時，晚一年出生就可以趕上這波主題賽，今年看到這主題後，努力思考到底可以產出些什麼？上網找了各式各樣的靈感，後來決定介紹一系列的[Google AI & Machine learning products](https://cloud.google.com/products/#ai-and-machine-learning)。獻醜了，這些都是我沒用過的服務，但這也是我參加鐵人賽最主要的目的：練功+卯起來學新知識。

這裡面的服務這麼多，有可能一一介紹嗎？我也不確定，但確定的是一定會有下面幾個服務：
<!-- more -->

- [Vision AI](https://cloud.google.com/vision/)
  探索某張圖裡有哪些秘密，包含文字、情緒等等，可以透過AutoML Vision加以訓練，也可以透過Vision API使用Google預先訓練好的Model。
  
- [Video AI](https://cloud.google.com/video-intelligence/)
  一張圖可以透過Vision AI分析，一個影片一秒好多張圖，我們可以選擇Video AI這個強大的工具。除了可以用一般預先訓練好的Video intelligence API外，也可以AutoML去做一些客製化的Model訓練你的Video。
  
- [Natural Language](https://cloud.google.com/natural-language/)
  自然語言的分析，投入一段文字，他可以分析出文字的內容(人、事件、地點等等)，結合Google Cloud Storage還能替我們分析GCS內的文件，是一套處理語意分析很好的工具。
  
- [Translation](https://cloud.google.com/translate/)
  這一套工具大家一定不陌生，Google翻譯，不過他竟然是一個AI & ML products，讓我更想了解他成為一個產品後，真正強大的功能是什麼‧
  
- [Cloud Text-to-Speech](https://cloud.google.com/text-to-speech/)
  文字轉語音，可以把一段文字用橫跨30多種語言的180種聲音唸出來給你聽，應該可以來玩一下怎麼用，或者寫文章的過程看看能不能發現其他組合。
  
- [Cloud Speech-to-Text](https://cloud.google.com/speech-to-text/)
  語音轉文字，就是上面那個服務的顛倒，據說可以分析120種語言的對話，這兩個服務都很想試試看對中文的support程度如何。
  
- [Dialogflow](https://cloud.google.com/dialogflow/)
  馬上聯想到的是Siri跟Google語音助理。恩，會講話的聊天機器人，預錄一段對話流程，對企業而言可以做一些客服在做的事情。

- [AutoML Tables](https://cloud.google.com/automl-tables/)
  這有趣了。去年寫[跟著Google學ML](https://ithelp.ithome.com.tw/users/20103835/ironman/1806)的時候，一堆資料從CSV來，然後要寫一堆分析，最後看結果。這個可以把CSV匯入，然後直接在上面做些簡單的訓練，在串上Prediction給我們的APP使用，可以的話這次會來搞懂怎麼用。

- [Recommendations AI](https://cloud.google.com/recommendations/)
  聽起來電商很愛這個，看看他們的slogan: **Earn your customers’ trust and loyalty by proving how well you understand them.**聽起來就很厲害，當年讀了一堆[recommedation algorithm](https://en.wikipedia.org/wiki/Recommender_system#Approaches)應該比較容易理解這怎麼玩，哈哈哈。

- [Cloud AutoML](https://cloud.google.com/automl/)
  最後一個一定要玩到的，就是這個AutoML，上面的服務都跟這個有關，一定要**知其所以然**一下，再看看有了他跟大家能擦出什麼樣的火花。
  
  
OK，這是這一系列文章的規劃，希望我寫的玩30天，也希望我這30天的內容夠有價值。

 
