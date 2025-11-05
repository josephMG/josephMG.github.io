---
title: '[Day 24] BMAD-Method Workflow'
tags: ['AI', 'GenAI', 'AI agents']
author: Joseph
category: 'AI & Machine Learning'
publishDate: 2025-10-08 13:21:43
image: 'banner.png'
---

Workflow的部分跟先前[Template](./)一樣結構很一致，整理起來也相對輕鬆，這邊就直接靠Gemini產生內容。

> Prompt: 幫我詳細講解 @.bmad-core/templates/ 裡的結構 用法

<!-- more -->

這些 YAML 文件定義了 BMAD 方法論中不同 AI 代理之間協作的流程，以完成特定的項目類型（例如：棕地全棧增強、綠地服務開發）。每個工作流程都像一個劇本，指導各個代理在什麼時候、做什麼事、使用什麼工具，以及如何與其他代理協作。

工作流程的通用結構

每個工作流程文件都遵循類似的 YAML 結構，主要包含以下頂層鍵：

1.  `workflow`: 包含工作流程自身的元數據。

    - id: 工作流程的唯一識別符。
    - name: 工作流程的名稱（例如："Brownfield Full-Stack Enhancement"）。
    - description: 工作流程的簡要說明，解釋其目的和適用範圍。
    - type: 工作流程的類型（例如：brownfield 棕地項目，greenfield 綠地項目）。
    - project_types: 此工作流程適用於的具體項目或增強類型列表。

2.  `sequence`: 這是工作流程的核心，定義了各個步驟的執行順序。它是一個列表，每個元素代表一個步驟或一個代理的行動。

    - `step`: 代表工作流程中的一個邏輯階段。
      - step: 步驟的唯一 ID。
      - action: 步驟的簡要描述。
      - notes: 給代理的詳細說明或上下文，解釋此步驟的目的、如何執行以及可能遇到的情況。
      - condition: 一個邏輯條件，決定此步驟是否執行。
      - routes: 用於基於 condition 進行條件路由，將工作流程導向不同的路徑。
    - `agent`: 代表由特定代理執行的行動。
      - agent: 負責此行動的代理角色（例如：analyst 分析師、pm 產品經理、architect 架構師、ux-expert 用戶體驗專家、po 產品負責人、sm 敏捷教練、dev 開發人員、qa 質量保證）。
      - action: 代理執行的具體行動。
      - creates: 此步驟中代理創建的輸出文件或產物。
      - uses: 代理在此步驟中使用的模板或任務。
      - requires: 代理執行此步驟所需的輸入文件或產物。
      - optional: 布林值，指示此步驟是否為可選。
      - condition: 代理行動執行的條件。
      - updates: 代理在此步驟中修改的產物。
      - repeats: 指示代理的行動是否重複（例如：for_each_epic 對於每個史詩）。
      - optional_steps: 步驟中可選的子步驟。

3.  `flow_diagram`: 一個 Mermaid 圖表字符串，以視覺化方式呈現工作流程。這有助於快速理解流程的邏輯和分支。

4.  `decision_guidance`: 提供關於**When to use**的指導，通常列出適用此流程的場景。

5.  `handoff_prompts`: 一系列預定義的消息或提示，代理可以使用它們來傳達狀態或將工作移交給下一個階段/代理。這有助於確保代理之間的溝通一致且有效。

If you like this post, please connect with me on LinkedIn and give me some encouragement. Thanks.
今天到這邊就結束囉，喜歡我文章的再幫忙推廣一下喔！
