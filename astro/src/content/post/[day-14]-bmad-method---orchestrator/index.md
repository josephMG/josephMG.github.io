---
title: '[Day 14] BMAD-Method - Orchestrator'
tags: ['AI', 'GenAI', 'AI agents']
author: Joseph
category: 'AI & Machine Learning'
publishDate: 2025-09-28 19:22:22
image: 'banner.png'
---

另外一個meta agent: Orchestrator **指揮家**，他不像[昨天](./day-13-bmad-method-master)的Master什麼都會做，但他什麼都會**叫人家做**。

從`opencode`問他 `summary what you can do` 他也很坦率地回答我：

> As the BMad Orchestrator, I am your central hub for managing and coordinating a team of specialized AI agents and structured workflows.

好的老闆。

<!-- more -->

### TOC

### Orchestrator

他是個知道什麼時候要找誰的人，它負責決定誰在何時做什麼、確保上下文被傳遞、並監控跨角色的進度與品質。

#### 主要用途

1. workflow工作流安排：把規劃跟開發結合起來，變成一連串的Analyst → PM → Architect → SM → Dev → QA loop，在我們需要的時候安插agent。
2. 指派工作：把任務design, sharding, development, testing指派給合適的agent，也可以偶爾
3. 上下文整合：把必要的上下文串連到後續的任務中，降低上下文遺失，讓BMad-Method能真正達成`context-engineered development`
4. cross-repo / cross-project協作：這部分我還沒測試到，但他可以減少多個repo導致的碎片化問題，並協調多個agent在不同repo裡的workflow
5. 品質把關：只要沒通過checklist，就不會跑去下一個agent，不會往下推進
6. 即時監控：透過status得知agent的進度跟當前的context
7. 人機互補：適當停下來請人工介入，然後再把我們的答覆告訴agent，請agent繼續執行

我們找他的時候方向要大一點，而那些太明確的工作不建議給 Orchestrator 執行。

> **CRITICAL RULE for Development**:
>
> - **ALWAYS use SM agent for story creation** - Never use bmad-master or bmad-orchestrator
> - **ALWAYS use Dev agent for implementation** - Never use bmad-master or bmad-orchestrator
> - **Why this matters**: SM and Dev agents are specifically optimized for the development workflow
> - **No exceptions**: Even if using bmad-master for everything else, switch to SM → Dev for implementation
>
> ref: https://github.com/bmad-code-org/BMAD-METHOD/blob/91c8e12777af798d33593ec0716a5011173df951/bmad-core/data/bmad-kb.md?plain=1#L166C1-L171C106

### 與Master或其他agent的分工

ChatGPT整理了一段很有意思的結論：

```
	•	Orchestrator：主導流程、決定 agent 呼叫時機、負責整體協調與監控（高階指揮）。 ￼
	•	Master Agent：method／checklist 專家與通用支援角色，常被用來做方法指導、檢查清單執行與輔助性的文件生成（與 Orchestrator 互補）；Orchestrator 會把一些「需要標準化檢查」的任務交給 Master 去執行。 ￼
	•	專家 agent（Analyst/Architect/SM/Dev/QA）：執行具體工作項目，Orchestrator 負責路由與 gating。
```

Gemini則是這麼說

```
  與 bmad-master 的關鍵區別

  * `bmad-orchestrator` 是個管理者：它管理一個團隊，強調的是流程和協調。它本身沒有開發技能，但精通如何組織有技能的 Agent。
  * `bmad-master` 是個執行者：它是一個個體，強調的是全能和便捷。它自己就具備所有技能，適合執行相對獨立或需要跨領域知識的單點任務。
```

今天的介紹就到這邊，明天來玩一下Orchestrator的party-mode，體驗一下他的用途

今天到這邊就結束囉，喜歡我文章的再幫忙推廣一下喔！
