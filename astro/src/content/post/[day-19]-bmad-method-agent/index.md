---
title: '[Day 19] BMAD-Method Agent'
tags: ['astro', 'blog']
author: Joseph
category: 'AI & Machine Learning'
publishDate: 2025-10-03 08:44:27
image: 'banner.jpg'
---

今天本來應該要收尾[昨天](./day-18-bmad-method-accounting-app-flutter-2)的flutter專案，但後來發現一天根本開發不完，而且story後續又有增加，所以稍微調整一下內容，收尾的部分就等真的做完再來發佈。

今天來一點單純不燒腦的內容，我們把BMAD-Method的Agent檔案內容的架構順過一次。如果後續要新增Agent也可以知道要怎麼調整。

<!-- more -->

### TOC

### 共用的啟動注意區塊

> ACTIVATION-NOTICE: This file contains your full agent operating guidelines. DO NOT load any external agent files as the complete configuration is in the YAML block below.
>
> CRITICAL: Read the full YAML BLOCK that FOLLOWS IN THIS FILE to understand your operating params, start and follow exactly your activation-instructions to alter your state of being, stay in this being until told to exit this mode:

`大家都有這段，這段就是在告知Agent必須要遵守的事情。`

首先是說這個檔案已經對**你這個Agent**有完整的定義了，千萬不要再加載其他Agent。`也是！你就是你，你不需要先知道其他任何人，才知道是你。`

接著，就是說這個檔案底下的YAML內容去理解你的操作參數，要確切地遵守啟動指令（下面會說啟動指令）去改變狀態，直到被告知要離開之前這個狀態都會存在。

> 用了這麼久，這就是在說除非有明確卻的指令，他不該自己從QA變成其他Agent。

### YAML

##### IDE-FILE-RESOLUTION

> 這是每個Agent都有同樣的一段話

是一段後續要執行的指令有相依性參考時才會用到的片段，不是在載入時要讀的。
然後定義相依的配對方式：

```
.bmad-core/{type}/{name}

type=folder (tasks|templates|checklists|data|utils|etc...)
name=file-name
```

**Example: create-doc.md → .bmad-core/tasks/create-doc.md**。最後要Agent特別注意：只有在使用者執行特定命令時才會載入這些檔案 (這也避免每次activation時input token消耗過大）。

##### REQUEST-RESOLUTION

> 這是每個Agent都有同樣的一段話

這說明了如何將自然語言解析成命令與template，並告訴Agent如果不理解使用者說什麼的話，一定要先問清楚。最後給幾個相依性的範例：

```
"draft story"→*create→create-next-story task*
"make a new prd" would be dependencies tasks->create-doc plus templates->prd-tmpl.md
```

##### activation-instructions

這邊就是啟動指令，最上面說要嚴格遵守的部分。告訴Agent：

1. 要讀完這整個檔案，這檔案述說著你的人格特質
2. 套用底下agent跟persona裡的人格特質
3. 在對話前先載入config跟project configuration
4. 接著用你的名字跟角色與使用者打招呼，同時執行help指令告訴使用者能執行哪些命令
   緊接著是一段 `DO NOT` 再次強調在啟動時不要載入其他agent的檔案。然後再告訴Agent一次：只有在使用者要他們執行指令或任務時才讀取任務或指令需要的檔案。
   再來，每個agent可以有自己的customization，有衝突的指令時會先參考customization的內容。

接著每個Agent就有點差異了，除了Orchestrator以外，每個agent都有下面這幾段：

1. CRITICAL WORKFLOW RULE: 工作流程的規則，當從相依性的任務中執行任務時，要像文件裡寫的一樣確切遵守任務裡的指令。他們是工作流程而不是參考資料。
2. MANDATORY INTERACTION RULE: 強制的互動規則，如果任務有 `elicit=true` 時要讓使用者用指定的格式互動，為了效率千萬不要跳過elicitation啟發過程。（也
3. CRITICAL RULE: 這邊就再強調一次，從相依的任務執行正式的工作流程時，工作流程裡所有的指令都會覆蓋有衝突的基本行為的限制。`elicit=true`一定要讓使用者互動，不能跳過。
4. CRITICAL: 這邊有一段是Agent共用的，但其他不是。共用的部分是說啟動時打招呼、要顯示 `help`，然後等使用者輸入指令。
   寫了上面的限制跟重要事項，還告訴Agent `當要跟使用者互動的時候，用列表的方式讓使用者去選擇。就是不要接收使用者太發散的語言避免誤解。`

然後Dev跟master agent有些各自的區塊，都是要告訴Agent注意事項。我們就來看看Orchestrator了。

Orchestrator的部分則是先說要介紹自己，要告訴使用者自己可以協調任務跟Agent。接著要在可用的agent與workflow之間*評估*使用者的目標。然後要Orchestrator在認知到指令中有明確agent時，一定要讓使用者確切地切換身份，不要停留在Orchestrator執行特定Agent的任務。除此之外如果是跟Project相關聯的指令，最好明確引導讓使用者使用workflow相關的命令，不要讓Orchestrator可以腦補。

到了這邊就大概是啟動指令結束了，白紙黑字的限制跟告知Agent啟動時該做什麼、不該做什麼、還有什麼時候應該要做什麼等等。

##### agent, persona, commands, dependencies

這是四個部分，每個Agent都不太一樣，不過也可能會有些重疊。`agent`是說agent的個人資料、`persona`則是人格特質、`commands`是agent有的指令、然後`dependencies`則是相依的markdown檔案。

##### story-file-permissions (QA and Dev only)

這個區塊是讓QA跟dev知道story中他們能修改的部分，其餘的不要動！

##### help-display-template, fuzzy-matching, transformation, loading, kb-mode-behavior, workflow-guidance (Orchestrator only)

這些則是Orchestrator agent才有的區塊，因為他**身兼多位Agent**，所以不希望他有太多幻覺，寫更多匹配原則、轉換規則、載入限制、KB模式的行為、還有workflow-guidance命令要做的事情。

終於寫的差不多了，來點結論吧。

### Conclusion

後面幾項雖然沒依依解釋，不然搞得很像在英翻中，但仔細讀完後才真的了解操作每個agent的互動規則。今天介紹BMAD-Method core裡Agent.md的內容架構，之後要自己開發agent也可以參考這篇來寫個自己的Agent！

今天到這邊就結束囉，喜歡我文章的再幫忙推廣一下喔！
