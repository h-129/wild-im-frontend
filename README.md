# 💬 Wild IM Frontend

> 一款基于 Vue 3 + TypeScript 纯手工打磨的轻量级即时通讯（IM）系统前端。

本项目是我个人开发的 Wild IM 聊天系统的前端部分。在实现核心聊天功能的同时，本项目高度注重代码的规范性与架构的整洁度。通过探索和实践
Vue 3 的组合式 API，力求在状态管理、类型约束和模块化上做到“少即是多”，拒绝臃肿的代码和魔法字符串。

## ✨ 项目亮点

* **⚡️ 前沿技术栈**：基于 Vue 3 (Script Setup) + Vite 构建，享受极速的开发和热更新体验。
* **🛡️ 严谨的类型安全**：全面使用 TypeScript，通过常量抽离（`as const`）与联合类型严格约束传参，从源头避免隐蔽 Bug。
* **🌍 极简的国际化**：内置 Vue-i18n 多语言支持（zh-CN / en-US），并通过自定义 Hook (`useAppLocale`) 优雅地封装了切换与缓存逻辑。
* **📦 清爽的数据管理**：采用原生的 LocalStorage 结合精简的 Pinia 状态树，遵循单一数据源原则，不滥用全局状态。
* **🧩 高内聚的模块化**：将 Hooks、Constants、Types 严格分层独立管理，代码逻辑清晰，易于阅读和二次开发。

## 🛠 技术栈

* **核心框架**：[Vue 3](https://vuejs.org/)
* **构建工具**：[Vite](https://vitejs.dev/)
* **开发语言**：[TypeScript](https://www.typescriptlang.org/)
* **路由管理**：[Vue Router 4](https://router.vuejs.org/)
* **状态管理**：[Pinia](https://pinia.vuejs.org/)
* **国际化**：[Vue-i18n 9](https://vue-i18n.intlify.dev/)
* **网络请求**：Axios
* **UI 库**：Ant Design Vue *(如果是用 Tailwind 或其他库可以自行替换)*

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone [https://github.com/h-129/wild-im-frontend.git](https://github.com/h-129/wild-im-frontend.git)
cd wild-im-frontend