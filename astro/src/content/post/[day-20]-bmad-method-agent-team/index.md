---
title: '[Day 20] BMAD-Method Agent Team'
tags: ['astro', 'blog']
author: Joseph
category: 'AI & Machine Learning'
publishDate: 2025-10-04 09:16:38
image: 'banner.jpg'
---

[昨天](./day-19-bmad-method-agent)介紹了Agent，今天來介紹Team：一群Agent組合起來的團隊！
這內容不多，所以今天的篇幅會有點少。

<!-- more -->

### TOC

```yaml
bundle:
  name: Team Fullstack
  icon: 🚀
  description: Team capable of full stack, front end only, or service development.
agents:
  - bmad-orchestrator
  - analyst
  - pm
  - ux-expert
  - architect
  - po
workflows:
  - brownfield-fullstack.yaml
  - brownfield-service.yaml
  - brownfield-ui.yaml
  - greenfield-fullstack.yaml
  - greenfield-service.yaml
  - greenfield-ui.yaml
```

充一點版面，把full-stack team內容貼上來。是的，`agent team`檔案裡定義的內容就只有`bundle`, `agents`, 跟 `workflows`

### bundle

定義了這個team組合的名稱、代表性icon、還有一段簡短的敘述。

### agents

這full-stack team會用到的agent，除了明確的agent以外，也可以像`team-all`一樣填上 `"*"` 把所有agent引入team裡面。

### workflows

這個team會哪些是先定義好的workflow，full-stack team 跟 team-all 一樣都把所有的workflow包含進來了，當然這邊也可以單純引入需要的workflow就好

### Conclusion

沒了。就是這麼短的。team我倒是用到不多，因為我都拆分成比較小的command去執行，不然只要一表達不清楚，我token量很快就爆了。

今天到這邊就結束囉，喜歡我文章的再幫忙推廣一下喔！
