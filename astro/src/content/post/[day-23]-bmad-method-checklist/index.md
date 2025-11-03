---
title: '[Day 23] BMAD-Method Checklist'
tags: ['AI', 'GenAI', 'AI agents']
author: Joseph
category: 'AI & Machine Learning'
publishDate: 2025-10-07 03:33:21
image: 'banner.png'
---

今天來介紹checklist的部分，這些簡介就快要進入尾聲了。checklist倒是不多，只有6個，我就來挑幾個言簡意賅的寫一下大項目。

<!-- more -->

### TOC

### architect-checklist

這是為Architect設計的檢查清單，確保技術設計和架構在開發執行前，達到robust, scalable, secure，並與產品需求高度一致。
第一部分是跟Agent說在開始之前要準備好的文件、要注意的事項，然後判斷專案的種類（純frontend? backend service? or fullstack?)，接著灌輸四種驗證方法，最後定義兩種互動方式。

第二部分就是讓LLM決定不同時候要執行不同的checklist：

1.  需求對齊 (Requirements Alignment)
    - 確保架構能夠全面支持產品的功能和非功能需求（如性能、可擴展性、安全性、可靠性、合規性），並嚴格遵守所有技術限制。架構師需確認每個需求都有具體的技術解決方案。
2.  架構基礎 (Architecture Fundamentals)
    - 評估架構的清晰度、模組化程度和設計質量。這包括檢查是否有清晰的圖表、組件職責是否明確、關注點是否分離、是否採用了適當的設計模式和最佳實踐，以及是否便於 AI 代理理解和實施。
3.  技術棧與決策 (Technical Stack & Decisions)
    - 審查技術選擇的合理性、兼容性和長期影響。架構師需確認所選技術滿足所有需求，版本明確，並有充分的理由支持，同時考慮替代方案的優缺點。
4.  前端設計與實施 `[[FRONTEND ONLY]]` (Frontend Design & Implementation)
    - 針對包含 UI 的專案，評估前端架構的完整性、一致性和實施細節。這包括 UI 框架選擇、狀態管理、組件結構、響應式設計、構建策略、前端與後端整合、路由、導航和性能優化等。
5.  彈性與操作準備 (Resilience & Operational Readiness)
    - 評估系統在面對故障、高負載和運營挑戰時的恢復能力和可操作性。這包括錯誤處理策略、監控與可觀察性、性能與擴展性規劃，以及部署與 DevOps 實踐。
6.  安全與合規 (Security & Compliance)
    - 從攻擊者視角審查系統的安全性，並確保符合所有相關法規。這包括身份驗證與授權、數據安全、API 與服務安全，以及基礎設施安全。
7.  實施指導 (Implementation Guidance)
    - 確保為開發團隊提供了清晰、全面的實施指引，以避免錯誤並提高效率。這包括程式碼標準、測試策略、開發環境設置和技術文件要求。
8.  依賴與整合管理 (Dependency & Integration Management)
    - 識別和管理所有內部和外部依賴，以及第三方整合，以降低生產問題的風險。這包括版本控制、回退策略、許可證影響和錯誤處理。
9.  AI 代理實施適用性 (AI Agent Implementation Suitability)
    - 特別針對可能由 AI 代理實施的架構，評估其模組化、清晰度、可預測性和錯誤預防能力。強調明確性優於隱含性，確保 AI 代理能夠準確理解和執行。
10. 可訪問性實施 `[[FRONTEND ONLY]]` (Accessibility Implementation)
    - 針對包含 UI 的專案，確保系統符合可訪問性標準，並規劃相應的測試。這包括語義 HTML、ARIA 實施、鍵盤導航、焦點管理和螢幕閱讀器兼容性。

最後一個部分是定義最終要產生的驗證報告，以完成所有的檢查程序

### change-checklist

前面也是一大段給LLM讀的內容，說明這是在專案有變更時的檢查清單，為了有系統性的引導讓Agent跟使用者，在整個workflow中接收到重大改變時，進行必要的analysis跟planning。
然後列出事前準備、需要的上下文、執行方法跟要讓LLM 銘記在心REMENBER的語錄（？

第二部分就是這裡所有的checklist

1. 理解變更的觸發因素與背景 (Understand the Trigger & Context)
   - 深入探究問題的本質和根本原因
2. 評估史詩層面的影響 (Epic Impact Assessment)
   - 分析變更對專案史詩結構和流程的連鎖反應。
3. 分析文件衝突與影響 (Artifact Conflict & Impact Analysis)
   - 檢查變更是否與現有專案文件（PRD、架構、前端規範等）產生衝突
4. 評估前進路徑與選項 (Path Forward Evaluation)
   - 清晰呈現並評估應對變更的多種策略選
5. 構建衝刺變更提案 (Sprint Change Proposal Components)
   - 將所有討論和決策整合為一份清晰、可執行的提案
6. 最終審查與移交 (Final Review & Handoff)
   - 在結束變更處理流程前，確保所有相關方達成共識

### pm-checklis

PM產品經理需求清單，為了確保產品定義的完整性與精準性。
然後先跟LLM說明何謂完整的PRD跟epic (well-structured, and appropriately scoped for MVP development), 接下來也是定義必要文件、注意事項、驗證方法、跟執行模式。

後續則一樣是checklist

1.  問題定義與背景 (Problem Definition & Context)
    - 確保產品解決的問題是真實、有價值且清晰的。
2.  MVP 範圍定義 (MVP Scope Definition)
    - 精準定義 MVP 的範圍，確保其最小化且能提供核心價值。
3.  使用者體驗要求 (User Experience Requirements)
    - 確保使用者體驗需求被充分考慮，並能橋接使用者需求與技術實施。
4.  功能要求 (Functional Requirements)
    - 確保功能需求足夠清晰，以便實施。
5.  非功能要求 (Non-Functional Requirements)
    - 定義產品的性能、安全、可靠性、合規性等非功能屬性。
6.  史詩與故事結構 (Epic & Story Structure)
    - 確保史詩和故事的定義合理，便於增量交付。
7.  技術指導 (Technical Guidance)
    - 為開發團隊提供足夠的技術方向和決策框架。
8.  跨職能要求 (Cross-Functional Requirements)
    - 涵蓋數據、整合和運營等跨職能領域的需求。
9.  清晰度與溝通 (Clarity & Communication)
    - 確保文件質量高，並促進利害關係人之間的有效溝通。

最後面也是定義最終報告生成的格式與內容

### Conclusion

這邊介紹了三個checklist，進去文件裡面細看時，可以看到每個checklist都有 `[[LLM:]]` 的區塊，再跟LLM說明注意事項，就像是要你的Gemini or ChatGPT先來讀這`[[LLM:]]`裡面的內容，再去理解checklist。前面幾個案子也跑了幾次checklist，都要等到最後結果是 `GO` 才安心， `NO-GO` 就總要修正到滿意為止。
今天到這邊就結束囉，喜歡我文章的再幫忙推廣一下喔！
