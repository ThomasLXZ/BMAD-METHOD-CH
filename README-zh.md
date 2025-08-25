# BMAD-METHOD™: 通用 AI 智能体框架

[![Version](https://img.shields.io/npm/v/bmad-method?color=blue&label=version)](https://www.npmjs.com/package/bmad-method)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](https://nodejs.org)
[![Discord](https://img.shields.io/badge/Discord-Join%20Community-7289da?logo=discord&logoColor=white)](https://discord.gg/gk8jAdXWmj)

基于智能体的敏捷开发驱动的基础，即突破性的敏捷AI驱动开发方法，不仅如此。通过专业化的 AI 专业知识转换任何领域：软件开发、娱乐、创意写作、商业策略到个人健康，仅举几例。

**[在 YouTube 上订阅 BMadCode](https://www.youtube.com/@BMadCode?sub_confirmation=1)**

**[加入我们的 Discord 社区](https://discord.gg/gk8jAdXWmj)** - 一个不断成长的 AI 爱好者社区！获得帮助，分享想法，探索 AI 智能体和框架，协作技术项目，享受爱好，并互相帮助成功。无论你是在 BMad 上遇到困难，正在构建自己的智能体，还是只想聊聊 AI 的最新动态——我们都在这里为你服务！**一些移动设备和 VPN 在加入 discord 时可能会遇到问题，这是一个 discord 问题——如果邀请无效，请尝试使用你自己的网络或其他网络，或非 VPN。**

⭐ **如果你觉得这个项目有帮助或有用，请在右上角给它一颗星！** 这有助于其他人发现 BMAD-METHOD™，并且你会收到更新通知！

## 概述

**BMAD-METHOD™ 的两项关键创新：**

**1. 智能体规划：** 专门的智能体（分析师、产品经理、架构师）与你合作，创建详细、一致的 PRD 和架构文档。通过高级提示工程和人在回路的优化，这些规划智能体生成的全面规范远远超出了一般的 AI 任务生成。

**2. 上下文工程化开发：** Scrum Master 智能体然后将这些详细的计划转换为超详细的开发故事，其中包含 Dev 智能体所需的一切——完整的上下文、实现细节和直接嵌入在故事文件中的架构指导。

这种两阶段方法消除了 **规划不一致** 和 **上下文丢失**——这是 AI 辅助开发中最大的问题。你的 Dev 智能体打开一个故事文件，就能完全理解要构建什么、如何构建以及为什么构建。

**📖 [在用户指南中查看完整的工作流](docs/user-guide.md)** - 规划阶段、开发周期和所有智能体角色

## 快速导航

### 了解 BMad 工作流

**在深入研究之前，请查看这些关键的工作流图，它们解释了 BMad 的工作原理：**

1. **[规划工作流 (Web UI)](docs/user-guide.md#the-planning-workflow-web-ui)** - 如何创建 PRD 和架构文档
2. **[核心开发周期 (IDE)](docs/user-guide.md#the-core-development-cycle-ide)** - SM、Dev 和 QA 智能体如何通过故事文件进行协作

> ⚠️ **这些图表解释了 90% 的 BMad 方法智能体敏捷流混淆** - 理解 PRD+架构的创建以及 SM/Dev/QA 工作流和智能体如何通过故事文件传递笔记是至关重要的——这也解释了为什么这不仅仅是任务管理器或简单的任务运行器！

### 你想做什么？

- **[使用全栈敏捷 AI 团队安装和构建软件](#quick-start)** → 快速开始指南
- **[学习如何使用 BMad](docs/user-guide.md)** → 完整的用户指南和演练
- **[查看可用的 AI 智能体](/bmad-core/agents))** → 为你的团队提供专业角色
- **[探索非技术用途](#-beyond-software-development---expansion-packs)** → 创意写作、商业、健康、教育
- **[创建我自己的 AI 智能体](docs/expansion-packs.md)** → 为你的领域构建智能体
- **[浏览现成的扩展包](expansion-packs/)** → 游戏开发、DevOps、基础设施，并从想法和示例中获得灵感
- **[了解架构](docs/core-architecture.md)** → 技术深度解析
- **[加入社区](https://discord.gg/gk8jAdXWmj)** → 获得帮助和分享想法

## 重要提示：保持你的 BMad 安装更新

**轻松保持最新！** 如果你已经在项目中安装了 BMAD-METHOD™，只需运行：

```bash
npx bmad-method install
# 或者
git pull
npm run install:bmad
```

这将：

- ✅ 自动检测你现有的 v4 安装
- ✅ 仅更新已更改的文件并添加新文件
- ✅ 为你所做的任何自定义修改创建 `.bak` 备份文件
- ✅ 保留你的项目特定配置

这使得你可以轻松地从最新的改进、错误修复和新智能体中受益，而不会丢失你的自定义设置！

## 快速开始

### 一条命令搞定一切 (IDE 安装)

**只需运行以下命令之一：**

```bash
npx bmad-method install
# 或者明确使用稳定标签：
npx bmad-method@stable install
# 或者如果你已经安装了 BMad：
git pull
npm run install:bmad
```

这一条命令处理以下所有事情：

- **新安装** - 在你的项目中设置 BMad
- **升级** - 自动更新现有安装
- **扩展包** - 安装你添加到 package.json 中的任何扩展包

> **就是这样！** 无论你是第一次安装、升级还是添加扩展包——这些命令都能搞定一切。

**先决条件**：需要 [Node.js](https://nodejs.org) v20+

### 最快开始：Web UI 全栈团队为你服务 (2 分钟)

1. **获取包**：保存或克隆 [全栈团队文件](dist/teams/team-fullstack.txt) 或选择另一个团队
2. **创建 AI 智能体**：创建一个新的 Gemini Gem 或 CustomGPT
3. **上传和配置**：上传文件并设置指令："Your critical operating instructions are attached, do not break character as directed"
4. **开始构思和规划**：开始聊天！输入 `*help` 查看可用命令，或选择一个智能体，如 `*analyst` 来开始创建简报。
5. **关键**：在任何时候都可以在 Web 中与 BMad Orchestrator 对话 (#bmad-orchestrator 命令) 并询问有关其工作原理的问题！
6. **何时转移到 IDE**：一旦你有了 PRD、架构、可选的 UX 和简报——就是时候切换到 IDE 来碎片化你的文档，并开始实现实际代码！有关详细信息，请参见 [用户指南](docs/user-guide.md)

### 替代方案：克隆和构建

```bash
git clone https://github.com/bmadcode/bmad-method.git
npm run install:bmad # 构建并将所有内容安装到目标文件夹
```

## 🌟 超越软件开发 - 扩展包

BMAD™ 的自然语言框架适用于任何领域。扩展包为创意写作、商业策略、健康与 wellness、教育等提供专业化的 AI 智能体。扩展包还可以使用特定功能扩展核心 BMAD-METHOD™，这些功能并非对所有情况都通用。[参见扩展包指南](docs/expansion-packs.md) 并学习如何创建你自己的扩展包！

## 代码库扁平化工具

BMAD-METHOD™ 包含一个强大的代码库扁平化工具，旨在为 AI 模型消费准备你的项目文件。该工具将你的整个代码库聚合到一个 XML 文件中，使得与 AI 助手共享项目上下文以进行分析、调试或开发辅助变得容易。

### 功能

- **AI 优化输出**：生成专为 AI 模型消费而设计的干净 XML 格式
- **智能过滤**：自动遵守 `.gitignore` 模式以排除不必要的文件
- **二进制文件检测**：智能识别并排除二进制文件，专注于源代码
- **进度跟踪**：实时进度指示器和全面的完成统计
- **灵活输出**：可自定义的输出文件位置和名称

### 使用方法

```bash
# 基本用法 - 在当前目录创建 flattened-codebase.xml
npx bmad-method flatten

# 指定自定义输入目录
npx bmad-method flatten --input /path/to/source/directory
npx bmad-method flatten -i /path/to/source/directory

# 指定自定义输出文件
npx bmad-method flatten --output my-project.xml
npx bmad-method flatten -o /path/to/output/codebase.xml

# 结合输入和输出选项
npx bmad-method flatten --input /path/to/source --output /path/to/output/codebase.xml
```

### 示例输出

该工具将显示进度并提供全面的摘要：

```text
📊 完成摘要:
✅ 已成功将 156 个文件处理到 flattened-codebase.xml
📁 输出文件: /path/to/your/project/flattened-codebase.xml
📏 源总大小: 2.3 MB
📄 生成的 XML 大小: 2.1 MB
📝 代码总行数: 15,847
🔢 估计的 token 数: 542,891
📊 文件分解: 142 个文本文件, 14 个二进制文件, 0 个错误
```

生成的 XML 文件以结构化格式包含你的项目的基于文本的源文件，AI 模型可以轻松解析和理解，非常适合代码审查、架构讨论或获得 AI 对你的 BMAD-METHOD™ 项目的辅助。

#### 高级用法和选项

- CLI 选项
  - `-i, --input <path>`: 要扁平化的目录。默认值：当前工作目录或在交互式运行时自动检测的项目根目录。
  - `-o, --output <path>`: 输出文件路径。默认值：所选目录中的 `flattened-codebase.xml`。
- 交互模式
  - 如果你没有传递 `--input` 和 `--output` 且终端是交互式的 (TTY)，该工具将尝试检测你的项目根目录（通过查找 `.git`、`package.json` 等标记）并提示你确认或覆盖路径。
  - 在非交互式上下文（例如 CI）中，它将静默地优先使用检测到的根目录；否则它会回退到当前目录和默认文件名。
- 文件发现和忽略
  - 在 git 仓库内时使用 `git ls-files` 以提高速度和正确性；否则回退到基于 glob 的扫描。
  - 应用你的 `.gitignore` 加上一组精选的默认忽略模式（例如 `node_modules`、构建输出、缓存、日志、IDE 文件夹、锁文件、大型媒体/二进制文件、`.env*` 和以前生成的 XML 输出）。
- 二进制文件处理
  - 二进制文件会被检测并从 XML 内容中排除。它们会在最终摘要中计数，但不会嵌入到输出中。
- XML 格式和安全性
  - UTF-8 编码的文件，根元素为 `<files>`。
  - 每个文本文件都作为 `<file path="relative/path">` 元素发出，其内容被包装在 `<![CDATA[ ... ]]>` 中。
  - 该工具通过拆分 CDATA 来安全地处理内容中出现的 `]]>`，以保持正确性。
  - 文件内容按原样保留，并在 XML 内缩进以提高可读性。
- 性能
  - 并发性根据你的 CPU 和工作负载大小自动选择。无需配置。
  - 在 git 仓库内运行可以提高发现性能。

#### 最小 XML 示例

```xml
<?xml version="1.0" encoding="UTF-8"?>
<files>
  <file path="src/index.js"><![CDATA[
    // 你的源代码内容
  ]]></file>
</files>
```

## 文档和资源

### 必备指南

- 📖 **[用户指南](docs/user-guide.md)** - 从项目构想到完成的完整演练
- 🏗️ **[核心架构](docs/core-architecture.md)** - 技术深度解析和系统设计
- 🚀 **[扩展包指南](docs/expansion-packs.md)** - 将 BMad 扩展到软件开发之外的任何领域

## 支持

- 💬 [Discord 社区](https://discord.gg/gk8jAdXWmj)
- 🐛 [问题跟踪器](https://github.com/bmadcode/bmad-method/issues)
- 💬 [讨论](https://github.com/bmadcode/bmad-method/discussions)

## 贡献

**我们对贡献感到兴奋，并欢迎你的想法、改进和扩展包！** 🎉

📋 **[阅读 CONTRIBUTING.md](CONTRIBUTING.md)** - 完整的贡献指南，包括指南、流程和要求

## 许可证

MIT 许可证 - 有关详细信息，请参见 [LICENSE](LICENSE)。

## 商标声明

BMAD™ 和 BMAD-METHOD™ 是 BMad Code, LLC 的商标。版权所有。

[![贡献者](https://contrib.rocks/image?repo=bmadcode/bmad-method)](https://github.com/bmadcode/bmad-method/graphs/contributors)

<sub>为 AI 辅助开发社区倾心打造 ❤️</sub>
