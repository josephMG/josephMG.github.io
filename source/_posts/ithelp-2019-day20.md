---
layout: blog
title: "[Day 20] Google Cloud Text-to-Speech - 子系列最終章"
date: 2019-09-28 07:29:59
tags: ["Google AI", "Text-to-Speech", "鐵人賽"]
---
今天是這子系列的最後一篇，因為Text-to-Speech沒有AutoML UI介面可以操作，無奈只好讓這邊結束這回合。

按照進度，這篇必須更深入介紹Text-to-Speech API，來看看今天的兩個主題吧。

### [列出Voice清單](https://cloud.google.com/text-to-speech/docs/list-voices)
下面這段code可以列出支援的語言，並提供不同種的發聲方式。

<!-- more -->

```golang
func ListVoices(w io.Writer) error {
  ctx := context.Background()

  client, err := texttospeech.NewClient(ctx)
  if err != nil {
    return err
  }

  // Performs the list voices request.
  resp, err := client.ListVoices(ctx, &texttospeechpb.ListVoicesRequest{})
  if err != nil {
    return err
  }

  for _, voice := range resp.Voices {
    // Display the voice's name. Example: tpc-vocoded
    fmt.Fprintf(w, "Name: %v\n", voice.Name)

    // Display the supported language codes for this voice. Example: "en-US"
    for _, languageCode := range voice.LanguageCodes {
      fmt.Fprintf(w, "  Supported language: %v\n", languageCode)
    }

    // Display the SSML Voice Gender.
    fmt.Fprintf(w, "  SSML Voice Gender: %v\n", voice.SsmlGender.String())

    // Display the natural sample rate hertz for this voice. Example: 24000
    fmt.Fprintf(w, "  Natural Sample Rate Hertz: %v\n",
      voice.NaturalSampleRateHertz)
  }

  return nil
}
```

![output](output.jpg)
透過output可以看到，每個語言大概都會有兩三種發音方式，涵蓋男性及女性的聲音，不過還是沒有中文QQ。
> 這裡也可以聽到每個supported language的聲音：https://cloud.google.com/text-to-speech/docs/voices

這邊有個特別的東西`SSML`，這到底是什麼呢？這可以讓我接續下一個主題！

### [Speech Synthesis Markup Language(SSML)](https://cloud.google.com/text-to-speech/docs/ssml)
先看看她長怎樣，我們再來介紹他：
```html
<speak>
  Here are <say-as interpret-as="characters">SSML</say-as> samples.
  I can pause <break time="3s"/>.
  I can play a sound
  <audio src="https://www.example.com/MY_MP3_FILE.mp3">didn't get your MP3 audio file</audio>.
  I can speak in cardinals. Your number is <say-as interpret-as="cardinal">10</say-as>.
  Or I can speak in ordinals. You are <say-as interpret-as="ordinal">10</say-as> in line.
  Or I can even speak in digits. The digits for ten are <say-as interpret-as="characters">10</say-as>.
  I can also substitute phrases, like the <sub alias="World Wide Web Consortium">W3C</sub>.
  Finally, I can speak a paragraph with two sentences.
  <p><s>This is sentence one.</s><s>This is sentence two.</s></p>
</speak>
```

看起來就像是HTML，一種Markup language，透過一些`tag`、`attribute`去定義(合成)該怎麼念、該停多久。裡面包含
- `<speak>` root element
- `<break>` 停頓
- `<say‑as>` 要把內容當什麼唸出來
- `<audio>` 定義額外的audio file
- `<p>,<s>` 段落
- `<sub>` 內容該怎麼念
- `<prosody>` 定義速率音量
- `<emphasis>` 強調語氣
- `<par>` 把多個相關內容關聯在一起(實際上跟順序無關)
- `<seq>` 把多個相關內容關聯在一起(跟順序有關)
- `<media>` par與seq內的tag，可定義內容的時間、淡入淡出之類的屬性

另外我們也可以傳入SSML讓Text-to-speech發音，像是下面的例子：
```golang
func SSMLToSpeech(text string) {
  var root string = "./testdata/text_to_speech"
  // Instantiates a client.
  ctx := context.Background()

  client, err := texttospeech.NewClient(ctx)
  if err != nil {
    log.Fatal(err)
  }

  // Perform the text-to-speech request on the text input with the selected
  // voice parameters and audio file type.
  req := texttospeechpb.SynthesizeSpeechRequest{
    // Set the text input to be synthesized.
    Input: &texttospeechpb.SynthesisInput{
      InputSource: &texttospeechpb.SynthesisInput_Ssml{Ssml: text},
    },
    // Build the voice request, select the language code ("en-US") and the SSML
    // voice gender ("neutral").
    Voice: &texttospeechpb.VoiceSelectionParams{
      LanguageCode: "en-US",
      SsmlGender:   texttospeechpb.SsmlVoiceGender_FEMALE,
    },
    // Select the type of audio file you want returned.
    AudioConfig: &texttospeechpb.AudioConfig{
      AudioEncoding: texttospeechpb.AudioEncoding_MP3,
    },
  }

  resp, err := client.SynthesizeSpeech(ctx, &req)
  if err != nil {
    log.Fatal(err)
  }

  // The resp's AudioContent is binary.
  filename := "output.mp3"
  err = ioutil.WriteFile(root+"/"+filename, resp.AudioContent, 0644)
  if err != nil {
    log.Fatal(err)
  }
  fmt.Printf("Audio content written to file: %v\n", filename)
}
```

呼叫時則傳入SSML:
```golang
text_to_speech.SSMLToSpeech("<speak>The <say-as interpret-as=\"characters\">SSML</say-as>" +
      "standard <break time=\"1s\"/>is defined by the" +
      "<sub alias=\"World Wide Web Consortium\">W3C</sub>.</speak>")
```
透過上面的方式，就可以產生對應的Output音檔了。

忽然覺得Text-to-speech真是博大精深，竟然還多了個markup language SSML出來。

OK，因為這系列沒有AutoML UI可以操作，所以今天是子系列的最後一章，謝謝大家觀看。
> code可以看我的github：
