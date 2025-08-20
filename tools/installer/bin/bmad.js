#!/usr/bin/env node

const { program } = require('commander');
const path = require('node:path');
const fs = require('node:fs').promises;
const yaml = require('js-yaml');
const chalk = require('chalk').default || require('chalk');
const inquirer = require('inquirer').default || require('inquirer');
const semver = require('semver');
const https = require('node:https');

const { createI18n } = require('../lib/i18n');
let lang = process.env.BMAD_LANG || process.env.LANG || 'zh-CN';
let t = createI18n(lang);

// Handle both execution contexts (from root via npx or from installer directory)
let version;
let installer;
let packageName;
try {
  // Try installer context first (when run from tools/installer/)
  version = require('../package.json').version;
  packageName = require('../package.json').name;
  installer = require('../lib/installer');
} catch (error) {
  // Fall back to root context (when run via npx from GitHub)
  console.log(`Installer context not found (${error.message}), trying root context...`);
  try {
    version = require('../../../package.json').version;
    installer = require('../../../tools/installer/lib/installer');
  } catch (error) {
    console.error(
      'Error: Could not load required modules. Please ensure you are running from the correct directory.',
    );
    console.error('Debug info:', {
      __dirname,
      cwd: process.cwd(),
      error: error.message,
    });
    process.exit(1);
  }
}

program.version(version).description(t('program.description'));

program
  .command('install')
  .description(t('cmd.install.desc'))
  .option('--lang <locale>', t('opt.lang.desc'))
  .option('-f, --full', 'Install complete BMad Method')
  .option('-x, --expansion-only', 'Install only expansion packs (no bmad-core)')
  .option('-d, --directory <path>', 'Installation directory')
  .option(
    '-i, --ide <ide...>',
    'Configure for specific IDE(s) - can specify multiple (cursor, claude-code, windsurf, trae, roo, kilo, cline, gemini, qwen-code, github-copilot, other)',
  )
  .option(
    '-e, --expansion-packs <packs...>',
    'Install specific expansion packs (can specify multiple)',
  )
  .action(async (options) => {
    try {
      if (options.lang) {
        lang = options.lang;
        t = createI18n(lang);
        process.env.BMAD_LANG = lang;
      }
      if (!options.full && !options.expansionOnly) {
        // Interactive mode
        const answers = await promptInstallation();
        if (!answers._alreadyInstalled) {
          await installer.install(answers);
          process.exit(0);
        }
      } else {
        // Direct mode
        let installType = 'full';
        if (options.expansionOnly) installType = 'expansion-only';

        const config = {
          installType,
          directory: options.directory || '.',
          ides: (options.ide || []).filter((ide) => ide !== 'other'),
          expansionPacks: options.expansionPacks || [],
        };
        await installer.install(config);
        process.exit(0);
      }
    } catch (error) {
      console.error(chalk.red('Installation failed:'), error.message);
      process.exit(1);
    }
  });

program
  .command('update')
  .description(t('cmd.update.desc'))
  .option('--force', 'Force update, overwriting modified files')
  .option('--dry-run', 'Show what would be updated without making changes')
  .action(async () => {
    try {
      await installer.update();
    } catch (error) {
      console.error(chalk.red('Update failed:'), error.message);
      process.exit(1);
    }
  });

// Command to check if updates are available
program
  .command('update-check')
  .description(t('cmd.updateCheck.desc'))
  .action(async () => {
    console.log(t('update.checking'));

    // Make HTTP request to npm registry for latest version info
    const req = https.get(`https://registry.npmjs.org/${packageName}/latest`, (res) => {
      // Check for HTTP errors (non-200 status codes)
      if (res.statusCode !== 200) {
        console.error(chalk.red(`Update check failed: Received status code ${res.statusCode}`));
        return;
      }

      // Accumulate response data chunks
      let data = '';
      res.on('data', (chunk) => (data += chunk));

      // Process complete response
      res.on('end', () => {
        try {
          // Parse npm registry response and extract version
          const latest = JSON.parse(data).version;

          // Compare versions using semver
          if (semver.gt(latest, version)) {
            console.log(
              chalk.bold.blue(
                t('update.available', { name: packageName, current: version, latest }),
              ),
            );
            console.log(chalk.bold.blue(`\n${t('update.install.latest')}`));
            console.log(chalk.bold.magenta(`  npm install ${packageName}@latest`));
            console.log(chalk.dim(`  ${t('update.or')}`));
            console.log(chalk.bold.magenta(`  npx ${packageName}@latest`));
          } else {
            console.log(chalk.bold.blue(t('update.upToDate', { name: packageName })));
          }
        } catch (error) {
          // Handle JSON parsing errors
          console.error(chalk.red('Failed to parse npm registry data:'), error.message);
        }
      });
    });

    // Handle network/connection errors
    req.on('error', (error) => {
      console.error(chalk.red(t('update.failed')), error.message);
    });

    // Set 30 second timeout to prevent hanging
    req.setTimeout(30_000, () => {
      req.destroy();
      console.error(chalk.red(t('update.timeout')));
    });
  });

program
  .command('list:expansions')
  .description(t('cmd.listExp.desc'))
  .action(async () => {
    try {
      await installer.listExpansionPacks();
    } catch (error) {
      console.error(chalk.red('Error:'), error.message);
      process.exit(1);
    }
  });

program
  .command('status')
  .description(t('cmd.status.desc'))
  .action(async () => {
    try {
      await installer.showStatus();
    } catch (error) {
      console.error(chalk.red('Error:'), error.message);
      process.exit(1);
    }
  });

program
  .command('flatten')
  .description(t('cmd.flatten.desc'))
  .option('-i, --input <path>', t('opt.input.desc'), process.cwd())
  .option('-o, --output <path>', t('opt.output.desc'), 'flattened-codebase.xml')
  .action(async (options) => {
    try {
      await installer.flatten(options);
    } catch (error) {
      console.error(chalk.red('Flatten failed:'), error.message);
      process.exit(1);
    }
  });

async function promptInstallation() {
  // Display ASCII logo
  console.log(
    chalk.bold.cyan(`
██████╗ ███╗   ███╗ █████╗ ██████╗       ███╗   ███╗███████╗████████╗██╗  ██╗ ██████╗ ██████╗
██╔══██╗████╗ ████║██╔══██╗██╔══██╗      ████╗ ████║██╔════╝╚══██╔══╝██║  ██║██╔═══██╗██╔══██╗
██████╔╝██╔████╔██║███████║██║  ██║█████╗██╔████╔██║█████╗     ██║   ███████║██║   ██║██║  ██║
██╔══██╗██║╚██╔╝██║██╔══██║██║  ██║╚════╝██║╚██╔╝██║██╔══╝     ██║   ██╔══██║██║   ██║██║  ██║
██████╔╝██║ ╚═╝ ██║██║  ██║██████╔╝      ██║ ╚═╝ ██║███████╗   ██║   ██║  ██║╚██████╔╝██████╔╝
╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝╚═════╝       ╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═════╝
  `),
  );

  console.log(chalk.bold.magenta(`🚀 ${t('install.banner.subtitle')}`));
  console.log(chalk.bold.blue(`✨ ${t('install.version', { version })}\n`));

  const answers = {};

  // Ask for installation directory first
  const { directory } = await inquirer.prompt([
    {
      type: 'input',
      name: 'directory',
      message: t('q.directory'),
      default: path.resolve('.'),
      validate: (input) => {
        if (!input.trim()) {
          return t('q.directory.invalid');
        }
        return true;
      },
    },
  ]);
  answers.directory = directory;

  // Detect existing installations
  const installDir = path.resolve(directory);
  const state = await installer.detectInstallationState(installDir);

  // Check for existing expansion packs
  const existingExpansionPacks = state.expansionPacks || {};

  // Get available expansion packs
  const availableExpansionPacks = await installer.getAvailableExpansionPacks();

  // Build choices list
  const choices = [];

  // Load core config to get short-title
  const coreConfigPath = path.join(__dirname, '..', '..', '..', 'bmad-core', 'core-config.yaml');
  const coreConfig = yaml.load(await fs.readFile(coreConfigPath, 'utf8'));
  const coreShortTitle = coreConfig['short-title'] || 'BMad Agile Core System';

  // Add BMad core option
  let bmadOptionText;
  if (state.type === 'v4_existing') {
    const currentVersion = state.manifest?.version || 'unknown';
    const newVersion = version; // Always use package.json version
    const versionInfo =
      currentVersion === newVersion
        ? `(v${currentVersion} - reinstall)`
        : `(v${currentVersion} → v${newVersion})`;
    bmadOptionText = `Update ${coreShortTitle} ${versionInfo} .bmad-core`;
  } else {
    bmadOptionText = `${coreShortTitle} (v${version}) .bmad-core`;
  }

  choices.push({
    name: bmadOptionText,
    value: 'bmad-core',
    checked: true,
  });

  // Add expansion pack options
  for (const pack of availableExpansionPacks) {
    const existing = existingExpansionPacks[pack.id];
    let packOptionText;

    if (existing) {
      const currentVersion = existing.manifest?.version || 'unknown';
      const newVersion = pack.version;
      const versionInfo =
        currentVersion === newVersion
          ? `(v${currentVersion} - reinstall)`
          : `(v${currentVersion} → v${newVersion})`;
      packOptionText = `Update ${pack.shortTitle} ${versionInfo} .${pack.id}`;
    } else {
      packOptionText = `${pack.shortTitle} (v${pack.version}) .${pack.id}`;
    }

    choices.push({
      name: packOptionText,
      value: pack.id,
      checked: false,
    });
  }

  // Ask what to install
  const { selectedItems } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'selectedItems',
      message: t('q.select.items'),
      choices: choices,
      validate: (selected) => {
        if (selected.length === 0) {
          return t('q.select.items.invalid');
        }
        return true;
      },
    },
  ]);

  // Process selections
  answers.installType = selectedItems.includes('bmad-core') ? 'full' : 'expansion-only';
  answers.expansionPacks = selectedItems.filter((item) => item !== 'bmad-core');

  // Ask sharding questions if installing BMad core
  if (selectedItems.includes('bmad-core')) {
    console.log(chalk.cyan(`\n📋 ${t('install.doc.settings')}`));
    console.log(chalk.dim(`${t('install.doc.settings.tip')}\n`));

    // Ask about PRD sharding
    const { prdSharded } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'prdSharded',
        message: t('q.prdSharded'),
        default: true,
      },
    ]);
    answers.prdSharded = prdSharded;

    // Ask about architecture sharding
    const { architectureSharded } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'architectureSharded',
        message: t('q.archSharded'),
        default: true,
      },
    ]);
    answers.architectureSharded = architectureSharded;

    // Show warning if architecture sharding is disabled
    if (!architectureSharded) {
      console.log(chalk.yellow.bold(`\n⚠️  ${t('warn.arch.off.title')}`));
      console.log(chalk.yellow(t('warn.arch.off.line1')));
      console.log(chalk.yellow(t('warn.arch.off.line2')));
      console.log(chalk.yellow(t('warn.arch.off.line3')));
      console.log(chalk.yellow(t('warn.arch.off.line4')));
      if (t('warn.arch.off.line5')) console.log(chalk.yellow(t('warn.arch.off.line5')));

      const { acknowledge } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'acknowledge',
          message: t('q.arch.off.ack'),
          default: false,
        },
      ]);

      if (!acknowledge) {
        console.log(chalk.red(t('cancelled')));
        process.exit(0);
      }
    }
  }

  // Ask for IDE configuration
  let ides = [];
  let ideSelectionComplete = false;

  while (!ideSelectionComplete) {
    console.log(chalk.cyan('\n🛠️  IDE Configuration'));
    console.log(chalk.bold.yellow.bgRed(` ⚠️  ${t('ide.multiselect.warn')} `));
    console.log(chalk.bold.magenta(`🔸 ${t('ide.use.arrows')}`));
    console.log(chalk.bold.magenta(`🔸 ${t('ide.use.space')}`));
    console.log(chalk.bold.magenta(`🔸 ${t('ide.use.enter')}\n`));

    const ideResponse = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'ides',
        message: t('ide.select'),
        choices: [
          { name: 'Cursor', value: 'cursor' },
          { name: 'Claude Code', value: 'claude-code' },
          { name: 'Windsurf', value: 'windsurf' },
          { name: 'Trae', value: 'trae' }, // { name: 'Trae', value: 'trae'}
          { name: 'Roo Code', value: 'roo' },
          { name: 'Kilo Code', value: 'kilo' },
          { name: 'Cline', value: 'cline' },
          { name: 'Gemini CLI', value: 'gemini' },
          { name: 'Qwen Code', value: 'qwen-code' },
          { name: 'Crush', value: 'crush' },
          { name: 'Github Copilot', value: 'github-copilot' },
        ],
      },
    ]);

    ides = ideResponse.ides;

    // Confirm no IDE selection if none selected
    if (ides.length === 0) {
      const { confirmNoIde } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirmNoIde',
          message: chalk.red(t('ide.none.confirm')),
          default: false,
        },
      ]);

      if (!confirmNoIde) {
        console.log(chalk.bold.red(`\n🔄 ${t('ide.return')}\n`));
        continue; // Go back to IDE selection only
      }
    }

    ideSelectionComplete = true;
  }

  // Use selected IDEs directly
  answers.ides = ides;

  // Configure GitHub Copilot immediately if selected
  if (ides.includes('github-copilot')) {
    console.log(chalk.cyan(`\n🔧 ${t('copilot.config')}`));
    console.log(chalk.dim(`${t('copilot.tip')}\n`));

    const { configChoice } = await inquirer.prompt([
      {
        type: 'list',
        name: 'configChoice',
        message: chalk.yellow(t('q.copilot.configChoice')),
        choices: [
          {
            name: t('copilot.choice.defaults'),
            value: 'defaults',
          },
          {
            name: t('copilot.choice.manual'),
            value: 'manual',
          },
          {
            name: t('copilot.choice.skip'),
            value: 'skip',
          },
        ],
        default: 'defaults',
      },
    ]);

    answers.githubCopilotConfig = { configChoice };
  }

  // Ask for web bundles installation
  const { includeWebBundles } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'includeWebBundles',
      message: t('q.webBundles'),
      default: false,
    },
  ]);

  if (includeWebBundles) {
    console.log(chalk.cyan(`\n📦 ${t('webBundles.tip')}`));

    const { webBundleType } = await inquirer.prompt([
      {
        type: 'list',
        name: 'webBundleType',
        message: t('webBundles.choose'),
        choices: [
          {
            name: t('webBundles.all'),
            value: 'all',
          },
          {
            name: t('webBundles.teams'),
            value: 'teams',
          },
          {
            name: t('webBundles.agents'),
            value: 'agents',
          },
          {
            name: t('webBundles.custom'),
            value: 'custom',
          },
        ],
      },
    ]);

    answers.webBundleType = webBundleType;

    // If specific teams, let them choose which teams
    if (webBundleType === 'teams' || webBundleType === 'custom') {
      const teams = await installer.getAvailableTeams();
      const { selectedTeams } = await inquirer.prompt([
        {
          type: 'checkbox',
          name: 'selectedTeams',
          message: t('webBundles.selectTeams'),
          choices: teams.map((t) => ({
            name: `${t.icon || '📋'} ${t.name}: ${t.description}`,
            value: t.id,
            checked: webBundleType === 'teams', // Check all if teams-only mode
          })),
          validate: (answer) => {
            if (answer.length === 0) {
              return t('webBundles.selectTeams.invalid');
            }
            return true;
          },
        },
      ]);
      answers.selectedWebBundleTeams = selectedTeams;
    }

    // If custom selection, also ask about individual agents
    if (webBundleType === 'custom') {
      const { includeIndividualAgents } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'includeIndividualAgents',
          message: t('webBundles.includeAgents'),
          default: true,
        },
      ]);
      answers.includeIndividualAgents = includeIndividualAgents;
    }

    const { webBundlesDirectory } = await inquirer.prompt([
      {
        type: 'input',
        name: 'webBundlesDirectory',
        message: t('q.webBundles.dir'),
        default: `${answers.directory}/web-bundles`,
        validate: (input) => {
          if (!input.trim()) {
            return t('q.directory.invalid');
          }
          return true;
        },
      },
    ]);
    answers.webBundlesDirectory = webBundlesDirectory;
  }

  answers.includeWebBundles = includeWebBundles;

  return answers;
}

program.parse(process.argv);

// Show help if no command provided
if (process.argv.slice(2).length === 0) {
  program.outputHelp();
}
