// Simple i18n helper for the installer CLI
// Usage:
//   const { createI18n } = require('../lib/i18n');
//   const t = createI18n('zh-CN');
//   console.log(t('greet', { name: '世界' }))

function format(str, params = {}) {
  return Object.entries(params).reduce((s, [k, v]) => s.replaceAll(`{${k}}`, String(v)), str);
}

const dict = {
  'en-US': {
    'program.description': 'BMad Method installer - Universal AI agent framework for any domain',
    'opt.lang.desc': 'Language/locale (e.g., zh-CN, en-US)',

    'cmd.install.desc': 'Install BMad Method agents and tools',
    'cmd.update.desc': 'Update existing BMad installation',
    'cmd.updateCheck.desc': 'Check for BMad Update',
    'update.checking': 'Checking for updates...',
    'cmd.listExp.desc': 'List available expansion packs',
    'cmd.status.desc': 'Show installation status',
    'cmd.flatten.desc': 'Flatten codebase to XML format',
    'opt.input.desc': 'Input directory to flatten',
    'opt.output.desc': 'Output file path',

    'install.banner.subtitle': 'Universal AI Agent Framework for Any Domain',
    'install.version': 'Installer v{version}',

    'q.directory': 'Enter the full path to your project directory where BMad should be installed:',
    'q.directory.invalid': 'Please enter a valid project path',

    'install.doc.settings': 'Document Organization Settings',
    'install.doc.settings.tip': 'Configure how your project documentation should be organized.',

    'q.select.items': 'Select what to install/update (use space to select, enter to continue):',
    'q.select.items.invalid': 'Please select at least one item to install',

    'q.prdSharded': 'Will the PRD (Product Requirements Document) be sharded into multiple files?',
    'q.archSharded': 'Will the architecture documentation be sharded into multiple files?',

    'warn.arch.off.title': 'IMPORTANT: Architecture Sharding Disabled',
    'warn.arch.off.line1':
      'With architecture sharding disabled, you should still create the files listed',
    'warn.arch.off.line2':
      'in devLoadAlwaysFiles (like coding-standards.md, tech-stack.md, source-tree.md)',
    'warn.arch.off.line3': 'as these are used by the dev agent at runtime.',
    'warn.arch.off.line4':
      'Alternatively, you can remove these files from the devLoadAlwaysFiles list',
    'warn.arch.off.line5': 'in your core-config.yaml after installation.',
    'q.arch.off.ack': 'Do you acknowledge this requirement and want to proceed?',
    cancelled: 'Installation cancelled.',

    'ide.settings': 'IDE Configuration',
    'ide.multiselect.warn': 'IMPORTANT: This is a MULTISELECT! Use SPACEBAR to toggle each IDE!',
    'ide.use.arrows': 'Use arrow keys to navigate',
    'ide.use.space': 'Use SPACEBAR to select/deselect IDEs',
    'ide.use.enter': 'Press ENTER when finished selecting',
    'ide.select':
      'Which IDE(s) do you want to configure? (Select with SPACEBAR, confirm with ENTER):',
    'ide.none.confirm':
      'You have NOT selected any IDEs. This means NO IDE integration will be set up. Is this correct?',
    'ide.return': 'Returning to IDE selection. Remember to use SPACEBAR to select IDEs!',

    'copilot.config': 'GitHub Copilot Configuration',
    'copilot.tip': 'BMad works best with specific VS Code settings for optimal agent experience.',
    'q.copilot.configChoice': 'How would you like to configure GitHub Copilot settings?',
    'copilot.choice.defaults': 'Use recommended defaults (fastest setup)',
    'copilot.choice.manual': 'Configure each setting manually (customize to your preferences)',
    'copilot.choice.skip': "Skip settings configuration (I'll configure manually later)",

    'q.webBundles':
      'Would you like to include pre-built web bundles? (standalone files for ChatGPT, Claude, Gemini)',
    'webBundles.tip': 'Web bundles are standalone files perfect for web AI platforms.',
    'webBundles.choose': 'What web bundles would you like to include?',
    'webBundles.all': 'All available bundles (agents, teams, expansion packs)',
    'webBundles.teams': 'Specific teams only',
    'webBundles.agents': 'Individual agents only',
    'webBundles.custom': 'Custom selection',
    'webBundles.selectTeams': 'Select team bundles to include:',
    'webBundles.selectTeams.invalid': 'You must select at least one team.',
    'q.webBundles.dir': 'Enter directory for web bundles:',

    'update.available': '⚠️  {name} update available: {current} → {latest}',
    'update.install.latest': 'Install latest by running:',
    'update.or': 'or',
    'update.upToDate': '✨ {name} is up to date',
    'update.parse.fail': 'Failed to parse npm registry data:',
    'update.failed': 'Update check failed:',
    'update.timeout': 'Update check timed out',
    'missing.files': 'Missing files',
    'modified.files': 'Modified files',
    'installed.expansion.packs': 'Installed expansion packs:',
    'warn.version.unknown': "Could not read version from package.json, using 'unknown'",
    'webBundles.includeAgents': 'Also include individual agent bundles?',
    'status.none': 'No BMad installation found in current directory tree',
    'status.invalid.manifest': 'Invalid installation - manifest not found',
    'list.agents.title': 'Available BMad Agents:',
    'list.agents.install.tip': 'Install with: npx bmad-method-zh install --agent=<id>',
    'list.exp.title': 'Available BMad Expansion Packs:',
    'list.exp.none': 'No expansion packs found.',
    'list.exp.install.tip':
      'Install with: npx bmad-method-zh install --full --expansion-packs <id>',

    // installer.js
    'spinner.analyzing': 'Analyzing installation directory...',
    'spinner.resolving': 'Resolving "{input}" to: {dir}',
    'dir.not.exist': 'The directory {dir} does not exist.',
    'q.dir.action': 'What would you like to do?',
    'dir.action.create': 'Create the directory and continue',
    'dir.action.change': 'Choose a different directory',
    'dir.action.cancel': 'Cancel installation',
    'install.cancelled': 'Installation cancelled.',
    'q.dir.new': 'Enter the new directory path:',
    'q.dir.invalid': 'Please enter a valid directory path',
    'dir.created': '✓ Created directory: {dir}',
    'dir.create.failed': 'Failed to create directory: {msg}',
    'dir.create.permission': 'You may need to check permissions or use a different path.',
    'spinner.no.v4.update': 'No existing v4 installation found to update',
    'error.install.failed': 'Installation failed',
    'error.install.failed.with': 'Installation failed: {msg}',

    // performFreshInstall & success messages
    'spinner.installing.bmad': 'Installing BMad Method...',
    'spinner.copy.core': 'Copying complete .bmad-core folder...',
    'spinner.copy.common': 'Copying common utilities...',
    'spinner.copy.docs': 'Copying documentation files...',
    'spinner.expansion.only': 'Installing expansion packs only...',
    'spinner.install.webbundles': 'Installing web bundles...',
    'spinner.setup.ide': 'Setting up {ide} integration...',
    'spinner.config.sharding': 'Configuring document sharding settings...',
    'spinner.create.manifest': 'Creating installation manifest...',
    'succeed.install.complete': 'Installation complete!',

    // existing v4 flow
    'exist.v4.found': 'Found existing BMad v4 installation',
    'integrity.checking': 'Checking installation integrity...',
    'issues.detected': 'Installation issues detected:',
    'exist.v4.upgrade.available': 'Upgrade available for BMad core',
    'exist.v4.same.version': 'Same version already installed',
    'exist.v4.newer.installed': 'Installed version is newer than available',
    'q.what.to.do': 'What would you like to do?',
    'no.exp.available': 'No expansion packs available.',
    'q.select.exp': 'Select expansion packs to install/update:',
    'no.exp.selected': 'No expansion packs selected.',
    'spinner.install.exp': 'Installing expansion packs...',
    'succeed.exp.installed': 'Expansion packs installed successfully!',

    // v3 flow
    'exist.v3.found': 'Found BMad v3 installation (bmad-agent/ directory)',
    'upgrade.v3.to.v4.start': 'Starting v3 to v4 upgrade process...',

    // unknown installation
    'unknown.existing': 'Directory contains existing files',
    'found.bmad.core.no.manifest': 'Found: .bmad-core directory (but no manifest)',
    'found.other.files': 'Found: Other files in directory',
    'q.enter.new.dir': 'Enter new installation directory:',

    // update/repair
    'spinner.checking.updates': 'Checking for updates...',
    'spinner.checking.modified': 'Checking for modified files...',
    'found.modified.files': 'Found modified files',
    'q.how.proceed': 'How would you like to proceed?',
    'update.cancelled': 'Update cancelled.',
    'spinner.reinstalling': 'Reinstalling files...',
    'spinner.updating.files': 'Updating files...',
    'spinner.clean.legacy.yml': 'Cleaning up legacy .yml files...',
    'spinner.prepare.repair': 'Preparing to repair installation...',
    'spinner.backup.modified': 'Backing up modified files...',
    'spinner.restoring': 'Restoring files...',
    'warn.source.notfound': '  Warning: Source file not found: {file}',

    // final messages
    'success.bmad.installed': '✓ BMad Method installed successfully!\n',
    'success.use.in.ide': 'To use BMad agents in {name}:',
    'success.no.ide': 'No IDE configuration was set up.',
    'success.manual.ide': 'You can manually configure your IDE using the agent files in:',
    'summary.title': 'Installation Summary:',
    'summary.core.installed': '✓ .bmad-core framework installed with all agents and workflows',
    'summary.exps.installed': '✓ Expansion packs installed:',
    'summary.webbundles.installed': '✓ Web bundles ({info}) installed to: {dir}',
    'summary.ide.rules': '✓ IDE rules and configurations set up for: {names}',
    'summary.webbundles.available': '📦 Web Bundles Available:',
    'summary.webbundles.tip1': 'Pre-built web bundles are available and can be added later:',
    'summary.webbundles.tip2': 'Run the installer again to add them to your project',
    'summary.webbundles.tip3': 'These bundles work independently and can be shared, moved, or used',
    'summary.webbundles.tip4': 'in other projects as standalone files.',
    'summary.singleagent.tip1': 'Need other agents? Run: npx bmad-method-zh install --agent=<name>',
    'summary.singleagent.tip2': 'Need everything? Run: npx bmad-method-zh install --full',
    'summary.read.userguide.title':
      '📖 IMPORTANT: Please read the user guide at docs/user-guide.md (also installed at .bmad-core/user-guide.md)',
    'summary.read.userguide.tip':
      'This guide contains essential information about the BMad workflow and how to use the agents effectively.',
  },
  'zh-CN': {
    'program.description': 'BMad 方法安装器 - 通用领域的 AI 智能体框架',
    'opt.lang.desc': '语言/区域（例如：zh-CN、en-US）',

    'cmd.install.desc': '安装 BMad 方法的智能体与工具',
    'cmd.update.desc': '更新已安装的 BMad',
    'cmd.updateCheck.desc': '检查是否有可用更新',
    'update.checking': '正在检查更新…',
    'cmd.listExp.desc': '列出可用的扩展包',
    'cmd.status.desc': '显示安装状态',
    'cmd.flatten.desc': '将代码库拍平成 XML 格式',
    'opt.input.desc': '要拍平的输入目录',
    'opt.output.desc': '输出文件路径',

    'install.banner.subtitle': '通用领域的 AI 智能体框架',
    'install.version': '安装器 v{version}',

    'q.directory': '请输入要安装 BMad 的项目路径：',
    'q.directory.invalid': '请输入有效的项目路径',

    'install.doc.settings': '文档组织设置',
    'install.doc.settings.tip': '配置你的项目文档应如何组织。',

    'q.select.items': '请选择要安装/更新的内容（空格选择，回车继续）：',
    'q.select.items.invalid': '请至少选择一项内容',

    'q.prdSharded': 'PRD（产品需求文档）是否需要拆分为多个文件？',
    'q.archSharded': '架构文档是否需要拆分为多个文件？',

    'warn.arch.off.title': '重要提示：已禁用架构分片',
    'warn.arch.off.line1': '在禁用分片的情况下，你仍需创建 devLoadAlwaysFiles 所列文件',
    'warn.arch.off.line2': '例如：coding-standards.md、tech-stack.md、source-tree.md',
    'warn.arch.off.line3': '这些文件会被开发智能体在运行时使用。',
    'warn.arch.off.line4':
      '或者，你也可以在安装后，从 core-config.yaml 的 devLoadAlwaysFiles 中移除这些文件。',
    'warn.arch.off.line5': '',
    'q.arch.off.ack': '已知悉此要求并继续？',
    cancelled: '安装已取消。',

    'ide.settings': 'IDE 配置',
    'ide.multiselect.warn': '重要：此处为多选！使用空格切换每个 IDE！',
    'ide.use.arrows': '使用方向键移动',
    'ide.use.space': '使用空格选择/取消 IDE',
    'ide.use.enter': '选择完成后按回车',
    'ide.select': '你想配置哪些 IDE？（空格选择，回车确认）：',
    'ide.none.confirm': '你未选择任何 IDE，这意味着不会配置任何 IDE 集成。是否确认？',
    'ide.return': '返回 IDE 选择。请记得使用空格进行选择！',

    'copilot.config': 'GitHub Copilot 配置',
    'copilot.tip': '为获得最佳体验，建议使用推荐的 VS Code 设置。',
    'q.copilot.configChoice': '你希望如何配置 GitHub Copilot 设置？',
    'copilot.choice.defaults': '使用推荐默认项（最快速）',
    'copilot.choice.manual': '逐项手动配置（按个人偏好）',
    'copilot.choice.skip': '跳过设置（稍后再配）',

    'q.webBundles': '是否包含预构建 Web Bundles？（适用于 ChatGPT、Claude、Gemini 等）',
    'webBundles.tip': 'Web Bundles 是适合 Web AI 平台的独立文件。',
    'webBundles.choose': '你希望包含哪些 Web Bundles？',
    'webBundles.all': '所有可用（智能体、团队、扩展包）',
    'webBundles.teams': '仅团队',
    'webBundles.agents': '仅智能体',
    'webBundles.custom': '自定义选择',
    'webBundles.selectTeams': '请选择要包含的团队：',
    'webBundles.selectTeams.invalid': '至少选择一个团队。',
    'q.webBundles.dir': '请输入 Web Bundles 输出目录：',

    'update.available': '⚠️  {name} 有可用更新：{current} → {latest}',
    'update.install.latest': '安装最新版本：',
    'update.or': '或',
    'update.upToDate': '✨ {name} 已是最新',
    'update.parse.fail': '解析 npm 注册表数据失败：',
    'update.failed': '检查更新失败：',
    'update.timeout': '检查更新超时',
    'missing.files': '缺失文件',
    'modified.files': '已修改文件',
    'installed.expansion.packs': '已安装的扩展包：',
    'warn.version.unknown': '无法从 package.json 读取版本，使用 unknown',
    'webBundles.includeAgents': '同时包含单个智能体的 Bundles 吗？',
    'status.none': '当前目录树中未发现 BMad 安装',
    'status.invalid.manifest': '安装无效 - 未找到清单',
    'list.agents.title': '可用的 BMad 智能体：',
    'list.agents.install.tip': '安装命令：npx bmad-method-zh install --agent=<id>',
    'list.exp.title': '可用的 BMad 扩展包：',
    'list.exp.none': '未发现扩展包。',
    'list.exp.install.tip': '安装命令：npx bmad-method-zh install --full --expansion-packs <id>',

    // installer.js
    'spinner.analyzing': '正在分析安装目录…',
    'spinner.resolving': '正在解析 "{input}" → {dir}',
    'dir.not.exist': '目录 {dir} 不存在。',
    'q.dir.action': '你希望进行哪一步？',
    'dir.action.create': '创建该目录并继续',
    'dir.action.change': '选择其他目录',
    'dir.action.cancel': '取消安装',
    'install.cancelled': '安装已取消。',
    'q.dir.new': '请输入新的目录路径：',
    'q.dir.invalid': '请输入有效的目录路径',
    'dir.created': '✓ 已创建目录：{dir}',
    'dir.create.failed': '创建目录失败：{msg}',
    'dir.create.permission': '你可能需要检查权限或改用其他路径。',
    'spinner.no.v4.update': '未发现可更新的 v4 安装',
    'error.install.failed': '安装失败',
    'error.install.failed.with': '安装失败：{msg}',

    // performFreshInstall & success messages
    'spinner.installing.bmad': '正在安装 BMad 方法…',
    'spinner.copy.core': '正在复制 .bmad-core 全部文件…',
    'spinner.copy.common': '正在复制 common 工具…',
    'spinner.copy.docs': '正在复制文档文件…',
    'spinner.expansion.only': '仅安装扩展包…',
    'spinner.install.webbundles': '正在安装 Web Bundles…',
    'spinner.setup.ide': '正在配置 {ide} 集成…',
    'spinner.config.sharding': '正在配置文档分片设置…',
    'spinner.create.manifest': '正在创建安装清单…',
    'succeed.install.complete': '安装完成！',

    // existing v4 flow
    'exist.v4.found': '发现已安装的 BMad v4',
    'integrity.checking': '正在检查安装完整性…',
    'issues.detected': '检测到安装问题：',
    'exist.v4.upgrade.available': 'BMad 核心可升级',
    'exist.v4.same.version': '已安装相同版本',
    'exist.v4.newer.installed': '已安装版本高于可用版本',
    'q.what.to.do': '请选择下一步操作：',
    'no.exp.available': '没有可用的扩展包。',
    'q.select.exp': '请选择要安装/更新的扩展包：',
    'no.exp.selected': '未选择任何扩展包。',
    'spinner.install.exp': '正在安装扩展包…',
    'succeed.exp.installed': '扩展包安装成功！',

    // v3 flow
    'exist.v3.found': '发现 BMad v3 安装（bmad-agent/ 目录）',
    'upgrade.v3.to.v4.start': '开始 v3 → v4 升级流程…',

    // unknown installation
    'unknown.existing': '目录包含已有文件',
    'found.bmad.core.no.manifest': '发现：.bmad-core 目录（但缺少清单文件）',
    'found.other.files': '发现：目录中存在其他文件',
    'q.enter.new.dir': '请输入新的安装目录：',

    // update/repair
    'spinner.checking.updates': '正在检查更新…',
    'spinner.checking.modified': '正在检查被修改的文件…',
    'found.modified.files': '发现被修改的文件',
    'q.how.proceed': '请选择处理方式：',
    'update.cancelled': '已取消更新。',
    'spinner.reinstalling': '正在重新安装文件…',
    'spinner.updating.files': '正在更新文件…',
    'spinner.clean.legacy.yml': '正在清理旧版 .yml 文件…',
    'spinner.prepare.repair': '准备修复安装…',
    'spinner.backup.modified': '正在备份已修改文件…',
    'spinner.restoring': '正在恢复文件…',
    'warn.source.notfound': '  警告：未找到源文件：{file}',

    // final messages
    'success.bmad.installed': '✓ BMad 方法安装成功！\n',
    'success.use.in.ide': '在 {name} 中使用 BMad 智能体：',
    'success.no.ide': '未配置任何 IDE 集成。',
    'success.manual.ide': '你可以在以下目录使用智能体文件手动配置 IDE：',
    'summary.title': '安装摘要：',
    'summary.core.installed': '✓ 已安装 .bmad-core 框架（包含全部智能体与工作流）',
    'summary.exps.installed': '✓ 已安装扩展包：',
    'summary.webbundles.installed': '✓ 已安装 Web Bundles（{info}）：{dir}',
    'summary.ide.rules': '✓ 已为以下 IDE 配置规则与设置：{names}',
    'summary.webbundles.available': '📦 可用的 Web Bundles：',
    'summary.webbundles.tip1': '提供预构建的 Web Bundles，可稍后添加：',
    'summary.webbundles.tip2': '再次运行安装器可将其添加到你的项目',
    'summary.webbundles.tip3': '这些文件可独立使用，可以分享、移动，或用于其他项目',
    'summary.webbundles.tip4': '作为独立文件。',
    'summary.singleagent.tip1': '需要其他智能体？运行：npx bmad-method-zh install --agent=<name>',
    'summary.singleagent.tip2': '需要全量安装？运行：npx bmad-method-zh install --full',
    'summary.read.userguide.title':
      '📖 重要：请阅读 docs/user-guide.md（同时安装在 .bmad-core/user-guide.md）',
    'summary.read.userguide.tip': '该指南包含 BMad 工作流与如何高效使用智能体的关键信息。',
  },
};

function createI18n(lang) {
  const locale = dict[lang] ? lang : 'zh-CN';
  const table = dict[locale];
  return function t(key, params) {
    const s = table[key] || dict['en-US'][key] || key;
    return format(s, params);
  };
}

module.exports = { createI18n };
