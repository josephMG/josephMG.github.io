---
title: '[Day 28] BMAD-Method v6 - part 3 - BMB'
tags: ['AI', 'GenAI', 'AI agents']
author: Joseph
category: 'AI & Machine Learning'
publishDate: 2025-10-12 03:05:26
image: 'banner.png'
---

今天介紹第二個核心功能，v6-alpha的介紹就告一個段落。
今天講的是[BMAD-Method Builder (BMB)](https://github.com/bmad-code-org/BMAD-METHOD/blob/main/src/modules/bmb/README.md)，他提供了更方便的工具去 `一邊討論一邊建立或編輯` agents, workflow, 跟 modules。比起前幾天讀了一堆agent or workflow的結構，BMB更簡單更便利。

> Module 就是 agents + workflows + tasks + templates

<!-- more -->

### TOC

```
BMAD-Method Builder 定位 / 目標
	•	BMB 是 BMad‑CORE 框架下的「Builder」模組：允許使用者 建立自訂代理人（Agents）、工作流程（Workflows）、模組（Modules）。  ￼
	•	適合對象：想要把 BMad 方法用於其他領域（例如法律、醫療、金融、教育、創意寫作等）的開發者或團隊。  ￼
	•	核心功能包括：定義新代理人 persona 與任務、設計並註冊自訂工作流程、打包成完整模組以供社群分享或內部復用。 (推論)
	•	安裝／目錄結構提示：「安裝後會在 bmad/ 資料夾中看到 bmb/ 模組」—例如 bmad/bmb/ 是 BMB 模組根目錄
```

對比以前v4裡的[Expansion packs](https://github.com/bmad-code-org/BMAD-METHOD/blob/V4/docs/expansion-packs.md)，`BMB`提供了更有彈性的工具，不用等社群Expansion pack，自己建立比較快！

| 檔案名稱                 | 用途說明             | 主要章節 / 預期涵蓋內容                                                             |
| ------------------------ | -------------------- | ----------------------------------------------------------------------------------- |
| create-agent-workflow.md | 建立自訂代理人的流程 | 定義代理人 persona、任務範本、註冊到系統、測試流程                                  |
| create-workflow.md       | 建立工作流程的流程   | 何謂 workflow、配置 agents、設定 step sequence、輸出 artefact、註冊流程             |
| create-module.md         | 打包模組的流程       | 模組結構、metadata 檔案、分享/發布方式、版本升級策略                                |
| faq.md                   | 常見問題與解答       | BMB 特有的疑問，如自訂 agent 不被識別、workflow 無效、模組衝突等                    |
| glossary.md              | 術語表               | 與 BMB 關聯的專有名詞（如 “Agent Template”, “Workflow Hook”, “Module Registry” 等） |
| troubleshooting.md       | 錯誤指南             | 在建立 agent / workflow / module 時錯誤排查步驟                                     |

BMad Builder (BMB) 是 BMAD-METHOD v6 引入的全新模組，專為**自定義代理人、工作流與擴展包（模組）**而設計，讓使用者可以：

- 視覺化或透過 CLI 組裝自己的代理、工作流與模組
- 快速客製化 BMAD 框架以符合特定領域需求（如遊戲開發、基礎架構、Web 開發）
- 分享至社群 或私有使用自建的擴展包

BMB 本質上是一個 meta-framework，幫助你建構其他代理與工作流系統，就像 BMAD-METHOD 本身也是一個模組一樣。

來速速看一下底下的檔案吧：

### `agents/`

- **內容**：`bmad-builder.agent.yaml`
- **用途**：定義 Builder agent 的 persona、任務、能力與預設行為。
- **建議使用**：
  - 透過此 YAML 配置新的 agent，BMAD 系統即可自動識別與使用。
  - 可以擴充自訂代理人，用於 create/edit workflow 或 module。

### `workflows/`

工作流程資料夾，用於管理各種 workflow，功能分為創建、編輯與特定用途。

#### 子資料夾：

1. `audit-workflow`
   - **用途**：審核流程工作流程，確保 agent 或 module 運行符合規範。
2. `convert-legacy`
   - **用途**：將舊有的 BMAD 模組或 agent 轉換為 BMB 可用格式。
3. `create-agent`
   - **用途**：自訂 agent 創建流程。
4. `create-module`
   - **用途**：自訂 module 創建流程。
5. `create-workflow`
   - **用途**：自訂 workflow 創建流程。
6. `edit-agent`
   - **用途**：修改已存在的 agent 配置。
7. `edit-module`
   - **用途**：修改已存在的 module。
8. `edit-workflow`
   - **用途**：修改已存在的 workflow。
9. `module-brief`
   - **用途**：模組簡報或概要文件，幫助使用者快速理解模組功能與範圍。

很多builder工具可以用，我們先挑create-module, create-agent, create-workflow 來介紹：

> 以下直接以Perplexity Research生成，prompt:
> https://github.com/bmad-code-org/BMAD-METHOD/tree/main/src/modules/bmb
> 幫我介紹 create-agent, create-workflow, create-module
> NOTE: 內容用markdown format回應給我

### create-agent 流程範例

**啟動指令**：`@bmad-builder *create-agent`

#### 流程步驟

1. **啟動代理**

   - 初始化 BMad Builder 代理
   - 載入代理建立範本與檢查清單

2. **引導式問答**

   - 代理角色定義（如「技術文件撰寫專家」）
   - 需要哪些依賴資源（templates, tasks, data）
   - 適用場景與互動模式（Incremental / YOLO）
   - 代理能力與限制說明

3. **自動生成**

   - `.agent.yaml` 檔案（代理定義）
   - 相關任務範本（tasks/\*.md）
   - 依賴項配置（dependencies.yaml）
   - 系統集成配置

4. **測試驗證**

   - BMB 代理自動測試新代理是否正常載入
   - 檢驗依賴項完整性
   - 驗證 YAML 結構合規性
   - 執行功能測試

5. **註冊到系統**
   - 自動更新 AGENTS.md 索引
   - 在模組註冊表中註冊
   - 同步至 IDE / CLI 工具
   - 生成代理文件與使用說明

#### 生成產物

- `agents/{agent-name}.agent.yaml` — 代理定義檔
- `tasks/{agent-name}/*.md` — 任務範本集
- `docs/{agent-name}-guide.md` — 使用說明
- `.meta/agents-registry.json` — 系統索引

---

### create-module 流程範例

**啟動指令**：`@bmad-builder *create-module`

#### 流程步驟

1. **啟動模組建立**

   - 初始化模組打包流程
   - 確認模組類型（代理集合、工作流集合、跨領域模組）

2. **定義模組基本信息**

   - 模組名稱（如 `game-dev-suite`）
   - 模組版本（如 `1.0.0`）
   - 模組描述與用途
   - 作者/維護者信息
   - 授權證書類型（MIT / Apache 2.0 等）

3. **指定模組元件**

   - 包含哪些代理（agents/\*.yaml）
   - 包含哪些工作流（workflows/\*.md）
   - 包含哪些任務模板（tasks/\*.md）
   - 包含哪些文件資源（docs/\*.md）
   - 外部依賴項列表

4. **配置 Metadata**

   - 生成 `package.yaml` 或 `module.metadata.yaml`
   - 定義依賴項（如依賴 BMad Core v6+）
   - 設定兼容性範圍
   - 配置安裝與初始化指令

5. **打包產出物**

   - 生成結構化目錄：`modules/{module-name}/`
   - 組織所有元件（agents, workflows, tasks, docs）
   - 自動壓縮與版本標籤（如 `game-dev-suite-1.0.0.tar.gz`）
   - 生成 SHA256 校驗碼（確保下載完整性）

6. **分享與發布**

   - 推送至 GitHub Repository
   - 上傳至 npm registry / pip / 私有倉庫
   - 更新模組索引與社群列表
   - 生成模組說明文件（README、CHANGELOG、INSTALL）
   - 配置自動更新檢查

7. **版本升級策略**
   - 語義版本管理（MAJOR.MINOR.PATCH）
   - 向後相容性檢查
   - 自動更新通知機制
   - 版本遷移指南

#### 生成產物

- `modules/{module-name}/package.yaml` — 模組元數據
- `modules/{module-name}/agents/` — 代理集合
- `modules/{module-name}/workflows/` — 工作流集合
- `modules/{module-name}/docs/` — 文件資源
- `{module-name}-1.0.0.tar.gz` — 壓縮包
- `checksum.sha256` — 完整性校驗檔
- `CHANGELOG.md` — 版本更新紀錄

---

### create-workflow 流程範例

**啟動指令**：`@bmad-builder *create-workflow`

#### 流程步驟

1. **定義流程目標**

   - 工作流名稱（如「全端應用開發流程」）
   - 適用場景與專案類型
   - 預期產出物與交付物
   - 流程持續時間與里程碑

2. **選擇代理組合**

   - 選擇參與代理（PM → Architect → SM → Dev → QA）
   - 定義代理執行順序
   - 設定代理間的數據流向
   - 配置並行與順序執行邏輯

3. **設定步驟順序**

   - 定義每個階段的輸入/輸出
   - 標明必需資源與上下文
   - 設定條件分支（如測試失敗需重做）
   - 配置 fallback 與異常處理機制

4. **定義檢查點與門檻**

   - Quality Gate 條件
   - 審查與批准流程
   - 成功標準與驗收條件
   - 風險評估與緩解策略

5. **生成 YAML 配置**

   - 自動產出 `greenfield-fullstack.yaml` 或自訂工作流 YAML
   - 配置每個步驟的參數與變數
   - 設定環境與工具鏈依賴
   - 嵌入監控與日誌配置

6. **測試與驗證**

   - 進行流程模擬運行
   - 檢驗代理銜接點
   - 驗證數據流完整性
   - 確認產出物結構

7. **整合到 BMB**
   - 註冊為可調用工作流
   - 更新工作流索引
   - 生成使用文件與範例
   - 配置版本控制

#### 生成產物

- `workflows/{workflow-name}/workflow.yaml` — 工作流定義
- `workflows/{workflow-name}/steps.md` — 步驟詳解
- `workflows/{workflow-name}/gates.yaml` — 品質門檻配置
- `workflows/{workflow-name}/README.md` — 使用說明
- `.meta/workflows-registry.json` — 系統索引

---

### 三大工作流對比表

| 工作流類型          | 輸入                         | 流程步驟                                     | 輸出產物                                | 適用情境                  |
| ------------------- | ---------------------------- | -------------------------------------------- | --------------------------------------- | ------------------------- |
| **create-agent**    | 角色定義、任務範本、依賴資源 | Q&A → 生成 → 測試 → 註冊                     | `.agent.yaml` + tasks + 系統記錄        | 建立新的 AI 代理角色      |
| **create-module**   | 模組名稱、元件選擇、版本信息 | 定義 → 配置 → 打包 → 校驗 → 發布             | `module.metadata.yaml` + ZIP + 版本標籤 | 打包並分享代理/工作流套件 |
| **create-workflow** | 流程目標、代理選擇、步驟定義 | 規劃 → 配置步驟 → 設定分支 → YAML生成 → 註冊 | `workflow.yaml` + 系統索引 + 文件       | 設計 AI 團隊協作流程      |

### Conclusion

看了這麼多Builder的介紹，回顧一下最上面的一句話 `BMB適合想要把 BMad 方法用於其他領域（例如法律、醫療、金融、教育、創意寫作等）的開發者或團隊`，是不是比以前Expansion Pack強大很多！有用的人趕快再分享一下你的Module去社群裡吧！

今天到這邊就結束囉，喜歡我文章的再幫忙推廣一下喔！
