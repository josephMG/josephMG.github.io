---
layout: blog
title: "[Day 22] Google Cloud Speech-to-Text - 2"
date: 2019-09-30 07:30:04
tags: ["Google AI", "Speech-to-Text", "鐵人賽"]
---
這個步調而言，今天就是Cloud Speech-to-Text API串接，前情提要一樣是要先建立project、Enable API、下載credential json之類的。忘了的人記得看{% post_link ithelp-2019-day3 這系列第三天 %}的文章。

好，現在要先來把test data抓下來，我們可以在google的[github](https://github.com/GoogleCloudPlatform/golang-samples/tree/master/speech/testdata)上找到很多檔案可以測試，我這邊抓的是`audio.raw`，並把它放到testdata/speech_to_text資料夾下。
<!-- more -->
![file structure](file-structure.jpg)

萬事俱備就只欠東風，我們來看看demo code吧：
```golang
func DemoCode(filename string) {
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
      Encoding:        speechpb.RecognitionConfig_LINEAR16,
      SampleRateHertz: 16000,
      LanguageCode:    "en-US",
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
    }
  }
}
```

在`main.go`裡面則僅只是呼叫`speech_to_text.DemoCode("./testdata/speech_to_text/audio.raw")`，接到了音檔以後，output就會吐出text給你看。
![output](output.jpg)

OK，今天的文章就到這邊，謝謝大家的觀看。
> 今天的code可以看github：https://github.com/josephMG/ithelp-2019/tree/Day-22
