---
title: "[Day 7] Google Video Intelligence AI - 2"
publishDate: 2019-09-15 07:29:30
tags: ["Google AI", "Video Intelligence AI", "鐵人賽"]
author: Joseph
categories: ["Joseph", "AI & Machine Learning"]
---
今天又是美好的開始，大家吃中秋烤肉了嗎？
這是這系列的第二篇文章，要來入門[Video Intelligence API](https://cloud.google.com/video-intelligence/docs/quickstarts?authuser=1)，這隻可以透過上傳影片，但實際上可以幹嘛呢？實際上包含下列幾個項目的偵測：

- Label Detection: 偵測狗、花、人物之類的物件
- Shot Change Detection: 可以偵測場景轉換
- Explicit Content Detection: 偵測是否包含成人資訊
- Speech Transcription: 將影片裡的聲音轉成文字
- Object Tracking: 物件追蹤並回報物件在影片裡的位置
<!-- more -->

現在就來開始測試看看。
> 前情提要：記得先[Enable API](https://console.cloud.google.com/apis/library)，放置環境變數的教學可以看{% post_link ithelp-2019-day3 這系列第三天 %}的文章
> 語言一樣使用Golang，然後跑在docker裡，之後也會放上github

為了一致性，我就開一個module video，然後專門放video Intelligence API的code。來看看我video.go

```golang
package video

import (
  "context"
  "fmt"
  "io"
  "log"

  "github.com/golang/protobuf/ptypes"

  video "cloud.google.com/go/videointelligence/apiv1"
  videopb "google.golang.org/genproto/googleapis/cloud/videointelligence/v1"
)

func DemoCode(w io.Writer, file string) error {
  ctx := context.Background()

  // Creates a client.
  client, err := video.NewClient(ctx)
  if err != nil {
    log.Fatalf("Failed to create client: %v", err)
    return nil
  }

  op, err := client.AnnotateVideo(ctx, &videopb.AnnotateVideoRequest{
    InputUri: file,
    Features: []videopb.Feature{
      videopb.Feature_LABEL_DETECTION, // Feature_LABEL_DETECTION
    },
  })
  if err != nil {
    log.Fatalf("Failed to start annotation job: %v", err)
    return nil
  }

  resp, err := op.Wait(ctx)
  if err != nil {
    log.Fatalf("Failed to annotate: %v", err)
    return nil
  }

  // Only one video was processed, so get the first result.
  result := resp.GetAnnotationResults()[0]

  for _, annotation := range result.SegmentLabelAnnotations {
    fmt.Fprintf(w, "Description: %s\n", annotation.Entity.Description)


    for _, category := range annotation.CategoryEntities {
      fmt.Fprintf(w, "\tCategory: %s\n", category.Description)
    }

    for _, segment := range annotation.Segments {
      start, _ := ptypes.Duration(segment.Segment.StartTimeOffset)
      end, _ := ptypes.Duration(segment.Segment.EndTimeOffset)
      fmt.Fprintf(w, "\tSegment: %s to %s\n", start, end)
      fmt.Fprintf(w, "\tConfidence: %v\n", segment.Confidence)
    }
  }
  return nil
}

```

主要是照著[Quickstart: Using Client Libraries](https://cloud.google.com/video-intelligence/docs/quickstart-client-libraries)的demo code來改，我主程式的地方import module以後就呼叫`video.DemoCode(os.Stdout, "gs://cloud-samples-data/video/cat.mp4")`，仔細觀察code裡面會看到有個`Feature_LABEL_DETECTION`這就是這邊主要要偵測的資訊。

好，來看看output吧。
```
Description: pet
        Category: animal
        Segment: 0s to 14.84s
        Confidence: 0.83893955
Description: tabby cat
        Category: cat
        Segment: 0s to 14.84s
        Confidence: 0.30844954
Description: maine coon
        Category: cat
        Segment: 0s to 14.84s
        Confidence: 0.32171762
Description: whiskers
        Segment: 0s to 14.84s
        Confidence: 0.30017045
Description: animal
        Segment: 0s to 14.84s
        Confidence: 0.9441419
Description: kitten
        Category: cat
        Segment: 0s to 14.84s
        Confidence: 0.36152288
Description: small to medium sized cats
        Category: mammal
        Segment: 0s to 14.84s
        Confidence: 0.7987513
Description: cat
        Category: pet
        Segment: 0s to 14.84s
        Confidence: 0.99747396
```

針對[緬因貓 maine coon](https://zh.wikipedia.org/zh-tw/%E7%B7%AC%E5%9B%A0%E8%B2%93)的判別不是很確定，但很確定這裡面都是貓，不完全是小貓，屬於偏中型尺寸的貓。想追根究柢到底正不正確嗎？
下載cat.mp4: `gsutil -m cp gs://cloud-samples-data/video/cat.mp4 .`

這只是一個14秒的一隻貓的影片，算是給我們的小故事大啟示！好，今天的文章就先到這邊，[這是](https://github.com/josephMG/ithelp-2019/tree/Day-7)今天的code的github，明天再來玩點其他API吧。
