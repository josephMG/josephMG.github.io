---
layout: blog
title: "[Day 11] Google Natural Language - 2"
date: 2019-09-19 07:29:39
tags: ["Google AI", "Natural Language", "鐵人賽"]
---
今天開始使用[Natural3Language API](https://cloud.google.com/natural-language/docs/quickstart-client-libraries)，一樣要先Enable API跟下載credential json。
> 忘記的人可以看{% post_link ithelp-2019-day3 這系列第三天 %}的文章回想一下。

在這之前我先重構一下原先的main.go，讓我加上參數去呼叫不同天的Demo api:
```golang
// Usage: `docker run -it golang ./app [DayXX]`
func main() {
  arg := os.Args[1]

  if arg == "Day3" {
    vision.DetectLabel(os.Stdout, "./testdata/furniture.jpg")
  } else if arg == "Day4" {
    vision.DetectText(os.Stdout, "./testdata/las-vegas.jpg")
    vision.DetectFaces(os.Stdout, "./testdata/face.jpg")
  } else if arg == "Day7" {
    video.DemoCode(os.Stdout, "gs://cloud-samples-data/video/cat.mp4")
  } else if arg == "Day8" {
    video.ShotChangeURI(os.Stdout, "gs://cloud-samples-data/video/gbikes_dinosaur.mp4")
    video.TextDetectionGCS(os.Stdout, "gs://python-docs-samples-tests/video/googlework_short.mp4")
  } else if arg == "Day11" {
    language.DemoCode(os.Stdout, "Hello World")
  }
}
```
<!-- more -->

day 11 我就直接呼叫時傳入Hello World的字串，然後把Demo code改成module的方式，像下面這樣
```golang
package natural_language

import (
  "context"
  "fmt"
  "io"
  "log"

  language "cloud.google.com/go/language/apiv1"
  languagepb "google.golang.org/genproto/googleapis/cloud/language/v1"
)

func DemoCode(w io.Writer, text string) error {
  ctx := context.Background()

  // Creates a client.
  client, err := language.NewClient(ctx)
  if err != nil {
    log.Fatalf("Failed to create client: %v", err)
    return err
  }

  // Detects the sentiment of the text.
  sentiment, err := client.AnalyzeSentiment(ctx, &languagepb.AnalyzeSentimentRequest{
    Document: &languagepb.Document{
      Source: &languagepb.Document_Content{
        Content: text,
      },
      Type: languagepb.Document_PLAIN_TEXT,
    },
    EncodingType: languagepb.EncodingType_UTF8,
  })
  if err != nil {
    log.Fatalf("Failed to analyze text: %v", err)
    return err
  }

  fmt.Fprintf(w, "Text: %v\n", text)
  if sentiment.DocumentSentiment.Score >= 0 {
    fmt.Fprintln(w, "Sentiment: positive")
  } else {
    fmt.Fprintln(w, "Sentiment: negative")
  }
  return nil
}
```

> languagepb詳細文件可以看這邊：https://godoc.org/google.golang.org/genproto/googleapis/cloud/language/v1
> 快速入門對這方面的連結還是提供不是很詳盡...

`Type`可以是`Document_PLAIN_TEXT`也可以是`Document_HTML`，但沒找到太多`Document_HTML`的敘述，在[Python Demo](https://cloud.google.com/natural-language/docs/classify-text-tutorial?hl=zh-tw)裡找到這段：
> 如要分類網頁內容，請將網頁的來源 HTML 做為 text 進行傳遞，並將 type 參數設為 `language.enums.Document.Type.HTML`。
> golang則為Document_HTML

至於`Source`這邊是傳入`Document_Content`並帶上參數`{Content: text}`，也可以是傳入`Document_GcsContentUri`然後帶上`{GcsContentUri: gcsURI}`，以gcs content為資料分析。

還沒實際測過分析HTML會有什麼結果，今天先來分析文字。來看看Output：
```shell
Text: Hello World
Sentiment: positive
```

看起來大家學程式的第一個作業Hello World是正向情緒的(也這樣大家才學得下去？)好囉，今天的github在這邊：https://github.com/josephMG/ithelp-2019/tree/Day-11
OK，今天工作提早結束，謝謝大家！

*開始越來越擔心內容不夠了...*

