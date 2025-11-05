---
title: '[Day 27] BMAD-Method v6 - part 2'
tags: ['AI', 'GenAI', 'AI agents']
author: Joseph
category: 'AI & Machine Learning'
publishDate: 2025-10-11 18:44:19
image: 'banner.png'
---

今天要介紹的是BMad-Method Module (BMM)，主要就是讀他們[docs](https://github.com/bmad-code-org/BMAD-METHOD/tree/main/src/modules/bmm/docs)，可以看到v6-alpha比v4多了很多東西。
不知道BMM是什麼的，我們再簡短介紹一次

```
BMM 定位 / 目標
	•	BMM 是 BMAD-METHOD 的「方法論模組」，提供以 AI-agent 驅動的敏捷式產品週期：從探索/分析 → 規劃(PRD) → 解法設計(Tech-Spec/GDD) → 實作 (Stories/Sprint) → 測試/發佈。
	•	適用場景：從小型 bug / 快速 feature（Level 0-1，Quick Spec Flow）到大型企業級專案（Level 4，Enterprise Agentic Development）。
	•	核心能力：多 agent 協作 (Party Mode)、工作流程（workflows）、文件範本（templates）、文件分片(sharding)以利 LLM 處理、IDE/shell 的 slash command 整合。
```

### TOC

<!-- more -->

### file list

| 檔案名稱                               | 概要                                                                    |
| -------------------------------------- | ----------------------------------------------------------------------- |
| agents-guide.md                        | 各代理人角色（如PM、QA、Dev等）的定位、分工與主要職責，含交互流程說明。 |
| brownfield-guide.md                    | 既有系統整合或複雜系統遷移的標準流程與注意事項。                        |
| enterprise-agentic-development.md      | 企業級代理型開發範例、架構、推薦流程與策略。                            |
| faq.md                                 | 常見問題、答疑與快速排除障礙指引。                                      |
| glossary.md                            | BMAD-METHOD專有名詞、術語解釋。                                         |
| party-mode.md                          | 團隊協作、快速迭代或特別開發場景的操作模式。                            |
| quick-spec-flow.md                     | 文件規格流程範本，快速產生規格規劃文件。                                |
| quick-start.md                         | 安裝、入門與啟動流程教學。                                              |
| scale-adaptive-system.md               | 大型／高伸縮系統設計及代理協作原則。                                    |
| test-architecture.md                   | 測試架構、品質策略、測試覆蓋流程標準與範本。                            |
| troubleshooting.md                     | 常見錯誤排查及解決方案索引。                                            |
| workflow-architecture-reference.md     | 流程架構參考，含各階段代理分工、模組互動架構。                          |
| workflow-document-project-reference.md | 文件型專案範本，如何以流程引導高品質文件產出。                          |
| workflows-analysis.md                  | 工作流分析指引，系統性分解專案任務。                                    |
| workflows-implementation.md            | 工作流實作指引，涵蓋典型開發與交付步驟。                                |
| workflows-planning.md                  | 專案規劃工作流標準，協助專案啟動與規模管理。                            |
| workflows-solutioning.md               | 解決方案設計與串接工作流指南。                                          |

If you like this post, please connect with me on LinkedIn and give me some encouragement. Thanks.

直接請ChatGPT整理這些文件的概要：

### BMad-Method Module (BMM) 文件說明

#### quick-start.md

- **目的**：15 分鐘上手，快速安裝並跑第一個 workflow
- **主要章節**：
  - 前置需求（Node版本、IDE支援、必需套件）
  - 安裝指令示例（如 `npx bmad-method install`）
  - 建立第一個專案、啟動 Quick Spec Flow
  - 常見安裝問題快速排查
- **實作建議**：
  - 跟著範例完成 end-to-end 測試，理解 agent 與 workflow 的交互成果

#### agents-guide.md

- **目的**：列出並說明 BMM 可用的 agent，每個 agent 的功能、範例 prompt / commands 與典型輸出
- **主要章節**：
  - Agent 一覽表（Analyst、PM、Architect、Developer、QA、Researcher、Designer 等）
  - 每位 agent 的 persona、責任範圍、典型指令、可呼叫 workflow
  - 交互範例（單 agent 與 party-mode）
- **實作建議**：
  - 把常用 agent 指令存到 IDE snippets 或 team wiki

#### party-mode.md

- **目的**：多 agent 協作（Party Mode）的啟用與流程說明
- **主要章節**：
  - 啟用方式（CLI / slash command）與流程視覺化
  - 多 agent 協作模式：分配分析、規劃、設計、驗證工作
  - 競合管理流程
- **實務建議**：
  - 大型 task 使用 party mode，小任務用單 agent 即可

#### scale-adaptive-system.md

- **目的**：解釋「Scale-Adaptive」概念與 Levels 0-4
- **主要章節**：
  - Levels 定義：Level 0 → Level 4
  - 每個 Level 建議 workflow 路徑
- **實作建議**：
  - 在專案 kickoff 時做 Level 評估，決定要走的 track 與 agent 組合

#### brownfield-guide.md

- **目的**：在已有 codebase 導入 BMM 的指南
- **主要章節**：
  - 掃描現有 repo（sharding / doc ingest / code snapshot）
  - 風險與 migration 策略
  - 建議的最小可行流程
- **實務建議**：
  - 先用 document-project workflow 建立 baseline 文件與測試

#### quick-spec-flow.md

- **目的**：Level 0-1 的快速規格流程
- **主要章節**：
  - 起始輸入 → agent 生成 quick-spec → 產出 story + acceptance criteria → 開發與 QA
  - 從 issue 到 PR body + test checklist 的示例
- **實務建議**：
  - 在 sprint backlog 建立 quick-spec 模板，方便 PM/PO 呼叫生成

#### workflows-analysis.md

- **目的**：Phase 1（分析、discover）流程與 agent 使用建議
- **主要章節**：
  - 問題定義 / 競品研究 / 使用者訪談匯總模板
  - 分析 agent 使用範例、輸入格式、輸出 artifacts
  - 與下一階段（planning）的接續格式
- **實務建議**：
  - 使用資料分片（sharding）讓大型 research doc 適合 LLM 讀取

#### workflows-planning.md

- **目的**：Phase 2（規劃 / PRD / Roadmap / epics & stories）流程
- **主要章節**：
  - PRD 範本欄位解說
  - Roadmap 與 release planning 範例
  - PRD → epic/story 拆解規則
- **實務建議**：
  - PRD template 保留 Context 供 agent 自動填入研究要點與限制條件

#### workflows-solutioning.md

- **目的**：Phase 3（Solutioning / architecture / tech-spec / GDD）
- **主要章節**：
  - Tech-Spec 範本（overview、components、APIs、data model、security、testing）
  - 架構評估流程（tradeoffs、scalability、cost）
  - Just-In-Time Tech-Spec 生成
- **實務建議**：
  - 在 tech-spec 中加入 acceptance criteria 與 performance targets

#### workflows-implementation.md

- **目的**：Phase 4（Implementation / Sprint / CI / PR）流程
- **主要章節**：
  - 任務拆分（story → task → subtask）、估時指引
  - CI / PR checklist 範本
  - Agent 協助開發示例（scaffold code、tests、PR body）
- **實務建議**：
  - 配合 repo CI 設定，生成的 PR body 與 test commands 一致化

#### workflows-testing.md

- **目的**：測試/QA 流程，agent 生成測試案例與驗收條件
- **主要章節**：
  - 測試策略（unit / integration / e2e）與 agent 生成 test cases
  - 測試文件格式
  - 測試結果 feed back 給 agent 做修正建議
- **實務建議**：
  - 將 test artifacts 的執行結果留在 project context，供 agent 做決策

#### workflow-architecture-reference.md

- **目的**：架構參考文件，提供 pattern、範例架構圖、建模 templates
- **主要章節**：
  - 常見架構 pattern（microservices, monolith, serverless）
  - 設計 checklist（security, observability, backup）
  - 範例 diagram 與 mermaid code block
- **實務建議**：
  - 把常用 pattern 加入 templates，讓 agent 可引用

#### workflow-document-project-reference.md

- **目的**：文件管理與 project-level document workflow
- **主要章節**：
  - document sharding policy（切片、命名、metadata）
  - 文件同步與版本控制策略
  - 文件追蹤（audit trail）
- **實務建議**：
  - 制定文件命名與 metadata 格式，agent 更新時自動填入

#### enterprise-agentic-development.md

- **目的**：企業級使用情境、多 agent 協作與合規 / DevOps / 安全整合
- **主要章節**：
  - 大型組織治理（approval gates、audit、compliance）
  - 多 agent 與人類 stakeholder 協作模型（SLA、escalation）
  - 安全與資料保護指引
- **實務建議**：
  - 先制定 data governance policy，再接入 agent

#### faq.md

- **目的**：常見問答、快速解法
- **典型問題**：
  - agent 不回應 → 檢查 context、重啟 agent
  - 自訂 PRD template → 放到 templates/ 並指向 workflow config
- **實務建議**：
  - 把團隊常問錯誤與修正步驟記到公司內部 FAQ

#### glossary.md

- **目的**：術語表，解釋常出現的縮寫與名詞
- **實務建議**：
  - 在 onboarding 使用 glossary 做基準線，讓 agent 與人類使用一致術語

#### troubleshooting.md

- **目的**：詳細除錯步驟（安裝問題、IDE integration、agent latency、缺少 dependencies）
- **典型章節**：
  - 安裝失敗的常見錯誤與解法
  - IDE slash command 不出現排查
  - agent 產生錯誤或輸出品質差的修正
- **實務建議**：
  - 把排錯步驟做成 checklist，方便每次安裝或升級時快速核對

### Conclusion

![v6-alpha-installation](./v6-alpha-installation.png)

光從文件上來看就覺得比`v4`詳細很多，我馬上嘗試透過 `npx bmad-method@alpha install` 安裝一次，竟然安裝過程就直接問你想要溝通的語言！整個安裝操作體驗真的是大升級。看到文章還沒體驗過的讀者，誠心推薦啊！

今天到這邊就結束囉，喜歡我文章的再幫忙推廣一下喔！
