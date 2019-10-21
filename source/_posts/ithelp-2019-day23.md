---
layout: blog
title: "[Day 23] Google Cloud Speech-to-Text - 子系列最終章"
date: 2019-10-01 07:30:07
tags: ["Google AI", "Speech-to-Text", "鐵人賽"]
---
因為這邊沒有AutoML的關係，所以今天是Speech-to-Text的最後一篇。

在doc文件裡的[這篇](https://cloud.google.com/speech-to-text/docs/streaming-recognize?authuser=1)是介紹如何使用Mic直接stream翻譯成文字，但我docker環境沒特別access host的mic，所以沒有測試這段。

#### 中文Speech-to-Text
仔細測了一下，{% post_link ithelp-2019-day22 昨天 %}的範例無法直接串接中文語音轉文字，原來是因為昨天使用的版本是`v1`，但中文相關的分析必須使用`v1p1beta1`，另一個原因是之前的檔案`try.m4a`一直測試都無法讀取，我把他轉為`try.mp3`以後，才可以順利解析。
<!-- more -->

有了這些解釋以後，我們來看看這次的code：
```golang
import (
  "context"
  "fmt"
  "io/ioutil"
  "log"

  speech "cloud.google.com/go/speech/apiv1p1beta1" //v1p1beta1
  speechpb "google.golang.org/genproto/googleapis/cloud/speech/v1p1beta1" //v1p1beta1
)

func ChineseSpeech(filename string) {
  ctx := context.Background()

  // Creates a client.
  client, err := speech.NewClient(ctx)
  if err != nil {
    log.Fatalf("Failed to create client: %v", err)
  }

  // Reads the audio file into memory.
  data, err := ioutil.ReadFile(filename)
  if err != nil {
    log.Fatalf("Failed to read file: %v", err)
  }

  // Detects speech in the audio file.
  resp, err := client.Recognize(ctx, &speechpb.RecognizeRequest{
    Config: &speechpb.RecognitionConfig{
      Encoding:             speechpb.RecognitionConfig_MP3,
      SampleRateHertz:      16000,
      LanguageCode:         "zh-TW",
      EnableWordConfidence: true,
    },
    Audio: &speechpb.RecognitionAudio{
      AudioSource: &speechpb.RecognitionAudio_Content{Content: data},
    },
  })
  if err != nil {
    log.Fatalf("failed to recognize: %v", err)
  }

  // Prints the results.
  for _, result := range resp.Results {
    for _, alt := range result.Alternatives {
      fmt.Printf("\"%v\" (confidence=%3f)\n", alt.Transcript, alt.Confidence)
      for _, word := range alt.Words {
        fmt.Printf("\t\"%v\" (confidence=%3f)\n", word.Word, word.Confidence)
      }
    }
  }
}
```

最上端的Import改為`v1p1beta1`以後，`Encoding`的部分也改成`RecognitionConfig_MP3`(這邊只有v1p1beta1有)，當然`LanguageCode`要改`zh-TW`，這樣就能順利解析中文了。
但我後面又多了一個`EnableWordConfidence`，這是什麼呢？在[這邊](https://cloud.google.com/speech-to-text/docs/word-confidence?authuser=1)解釋是**他可以針對每個字回傳可信度**，出來就會變下圖：
![output](output.jpg)

每個字都有各自的可信度，不過都一樣也是怪怪的...，我們來看看英文是不是也一樣：
![output](output2.jpg)

可以看出來英文的每個可信度不一樣，這樣才比較正常。看來中文的部分可能還是有些問題，但不確定是不是參數影響的關係。

OK，今天的文章就到這邊，颱風假希望大家為了自己的安全好，沒特別的事情別出門。謝謝大家的觀看。

> 今天的code可以看github：https://github.com/josephMG/ithelp-2019/tree/Day-23
