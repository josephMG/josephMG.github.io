---
layout: blog
title: "[Day 15] Google Translation - 2"
date: 2019-09-23 07:29:48
tags: ["Google AI", "Translate", "鐵人賽"]
---
昨天玩完了Demo，按照步調今天就用Code來實踐吧。在下筆的時候Client Library有`v2`、`v3beta1`兩個版本，但Golang只有`v2`的Example，需要的話就只能用Golang執行`CURL POST`去呼叫`v3beta1`版API，所以我這邊就先使用v2來試試看。

### [Translate Text](https://cloud.google.com/translate/docs/translating-text)
> 架構一樣是在modules底下建立一個`translation.go`的module
> 還有要記得抓credential json下來，可以參考{% post_link ithelp-2019-day3 這系列第三天 %}的文章

<!-- more -->

我們直接來看看`translation.go`裡面有什麼吧。
```golang
package translation

import (
  "context"
  "fmt"
  "log"

  "cloud.google.com/go/translate"
  "golang.org/x/text/language"
)

func TranslateText(text string) error {
  ctx := context.Background()

  // Creates a client.
  client, err := translate.NewClient(ctx)
  if err != nil {
    log.Fatalf("Failed to create client: %v", err)
  }

  // Sets the target language.
  target, err := language.Parse("zh-TW")
  if err != nil {
    log.Fatalf("Failed to parse target language: %v", err)
  }

  // Translates the text into Russian.
  translations, err := client.Translate(ctx, []string{text, text}, target, nil)
  if err != nil {
    log.Fatalf("Failed to translate text: %v", err)
  }

  fmt.Printf("Text: %v\n", text)
  fmt.Printf("Translations: %+v\n", translations)
  fmt.Printf("Translation[0]: %v\n", translations[0].Text)

  return nil
}
```
> Language Support可以參考這裡：https://cloud.google.com/translate/docs/languages

這邊我特地做了個小實驗，`client.Translate(ctx, []string{text, text}, target, nil)`我傳入了兩個text，然後再後面看看translations出來會不會一次有兩個。結果呢....

output:
```shell
Text: Hello World
Translations: [{Text:你好，世界 Source:en Model:} {Text:你好，世界 Source:en Model:}]
Translation[0]: 你好，世界
```

恩，看來可以一次傳入多個需要翻譯的文字，會減少很多次API呼叫。
OK，好今天就到這邊，謝謝大家的觀看。
