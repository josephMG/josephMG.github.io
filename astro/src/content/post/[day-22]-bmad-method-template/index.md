---
title: '[Day 22] BMAD-Method Template'
tags: ['AI', 'GenAI', 'AI agents']
author: Joseph
category: 'AI & Machine Learning'
publishDate: 2025-10-06 11:31:40
image: 'banner.png'
---

Template裡的結構都一樣，今天的介紹就比較單純一點。下面是直接用Gemini產生的整理。

> Prompt: 幫我詳細講解 @.bmad-core/templates/ 裡的結構

<!-- more -->

這些 YAML 模板是 BMAD 方法論的核心，它們定義了 AI 代理如何生成結構化文件（如架構文檔、PRD、故事等）。每個模板都像一個藍圖，指導 AI 代理收集資訊、組織內容並以特定格式輸出。

模板的通用結構

每個模板文件都遵循類似的 YAML 結構，主要包含以下頂層鍵：

1.  `template`: 包含模板自身的元數據。

    - id: 模板的唯一識別符。
    - name: 模板的名稱（例如："Architecture Document"）。
    - version: 模板的版本。
    - output: 定義輸出文件的屬性。
      - format: 輸出文件的格式（例如：markdown, yaml）。
      - filename: 輸出文件的預設路徑和名稱，通常包含佔位符（例如：docs/architecture.md）。
      - title: 輸出文件的標題，通常包含佔位符。

2.  `workflow`: 定義此模板在工作流程中的行為。

    - mode: 工作模式（例如：interactive 互動模式，non-interactive 非互動模式）。
    - elicitation: 資訊獲取策略（例如：advanced-elicitation）。
    - custom_elicitation: 針對特定模板的自定義獲取選項。

3.  `agent_config` (僅限 `story-tmpl.yaml`): 配置代理行為。

    - editable_sections: 定義哪些部分可以被代理編輯。

4.  `sections`: 這是模板的核心，定義了文檔的內容結構，由一系列區塊組成。每個區塊（或子區塊）都可以有以下屬性：
    - id: 區塊的唯一識別符。
    - title: 區塊的標題，將作為文檔中的標題。
    - instruction: 給 AI 代理的詳細指令，說明如何填充此區塊的內容。這是指導 AI 代理行為的關鍵。
    - elicit: true: 表示 AI 代理應該與用戶互動，以獲取此區塊的內容或確認其內容。
    - type: 區塊內容的類型（例如：table 表格、code 代碼塊、bullet-list 項目列表、numbered-list 編號列表、choice 選擇）。如果未指定，則預設為純文本或段落。
    - template: 一個 Markdown 字符串，包含佔位符 {{...}}。AI 代理會根據指令填充這些佔位符。
    - repeatable: true: 表示此區塊可以重複多次（例如：多個組件、多個風險）。
    - condition: 一個條件，只有當條件滿足時，此區塊才會被包含在最終文檔中。
    - columns, rows, examples: 針對 type: table 或提供範例的屬性。
    - prefix: 針對 numbered-list，定義編號的前綴（例如：FR 代表功能需求）。
    - owner, editors: 定義此區塊的負責人或可編輯者（主要用於 story-tmpl.yaml）。
    - content: 直接的靜態內容，不包含佔位符。
    - choices: 針對 type: choice，提供可選的選項列表。

### Conclusion

可以看到在section裡有一欄 `elicit: true`，就是在產生時要多與使用者互動，明確讓使用者根據列出的選項做選擇。這部分前面[tasks](./day-21-bmad-method-task)也有提到不少。Template格式單純很多，需要的話也可以建立自己的template。
今天到這邊就結束囉，喜歡我文章的再幫忙推廣一下喔！
