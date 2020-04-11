import arg from 'arg';
import inquirer from 'inquirer';
import { createProject } from './main';
import {
  DEFAULT_PACKAGE_NAME,
  DEFAULT_SOURCE_URL,
  DEFAULT_APP_NAME,
  LOGO_PLACEHOLDER,
} from './constants';

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      '--appName': String,
      '--packageName': String,
      '--url': String,
      '--icon': String,
    },
    {
      argv: rawArgs.slice(2),
    },
  );

  return {
    appName: args['--appName'] || false,
    packageName: args['--packageName'] || false,
    sourceUrl: args['--url'] || false,
    icon: args['--icon'] || false,
  };
}

async function promptForMissingOptions(options) {
  const questions = [];

  if (!options.appName) {
    questions.push({
      type: 'input',
      name: 'appName',
      message: 'Enter your app name:',
      default: 'create-quick-app',
      default: DEFAULT_APP_NAME,
    });
  }

  if (!options.packageName) {
    questions.push({
      type: 'input',
      name: 'packageName',
      message: 'Enter your package name:',
      default: DEFAULT_PACKAGE_NAME,
    });
  }

  if (!options.sourceUrl) {
    questions.push({
      type: 'input',
      name: 'sourceUrl',
      message: 'Enter your source url:',
      default: DEFAULT_SOURCE_URL,
    });
  }

  if (!options.icon) {
    questions.push({
      type: 'input',
      name: 'icon',
      message: 'Enter your icon path:',
      default: LOGO_PLACEHOLDER,
    });
  }

  const answers = await inquirer.prompt(questions);

  if (answers.icon === LOGO_PLACEHOLDER) answers.icon = false;

  return {
    ...options,
    appName: options.appName || answers.appName,
    packageName: options.packageName || answers.packageName,
    sourceUrl: options.sourceUrl || answers.sourceUrl,
    icon: options.icon || answers.icon,
  };
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);

  await createProject(options);
}
