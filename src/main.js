import chalk from 'chalk';
import fs from 'fs';
import Listr from 'listr';
import replace from 'replace-in-file';
import {
  getUpdatedManifest,
  getManifestFilePath,
  getUxFilePath,
  getLogoSourceDirectory,
  getLogoTargetDirectory,
  getTemplateTargetDirectory,
  getTemplateSourceDirectory,
  copy,
  access,
} from './utils';
import { UX_FILE_KEY_TO_REPLACE } from './constants';

async function copyTemplateFiles(options) {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false,
  });
}

function modifyManifestFile(options) {
  const manifestPath = getManifestFilePath(options);

  fs.readFile(manifestPath, 'utf8', (error, manifestJson) => {
    if (error) {
      console.log('File read failed:', error);
      return;
    }

    fs.writeFile(manifestPath, getUpdatedManifest(options, manifestJson), 'utf-8', (error) => {
      if (error) {
        console.log('File read failed:', error);
        return;
      }
    });
  });
}

async function modifyHelloUx(options) {
  const helloUxPath = getUxFilePath(options);

  const replaceOptions = {
    files: helloUxPath,
    from: UX_FILE_KEY_TO_REPLACE,
    to: options.sourceUrl,
  };

  try {
    await replace(replaceOptions);
  } catch (error) {
    console.error('%s Error occurred during creation of hello.ux', chalk.red.bold('ERROR'));
  }
}

async function modifyIcon(options) {
  if (!options.icon) {
    console.log('%s Default icon will be used', chalk.greenBright.bold('OK'));
    return;
  }

  const iconDir = getLogoSourceDirectory(options);

  try {
    await access(iconDir, fs.constants.R_OK);
  } catch (err) {
    console.error('%s Invalid icon path. Default icon will be used', chalk.redBright.bold('WARN'));
    return;
  }

  copy(iconDir, getLogoTargetDirectory(options), {
    clobber: true,
  });
}

export async function createProject(options) {
  options = {
    ...options,
    targetDirectory: options.targetDirectory || getTemplateTargetDirectory(options),
  };

  const templateDir = getTemplateSourceDirectory();

  options.templateDirectory = templateDir;

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    console.error('%s Invalid template directory', chalk.red.bold('ERROR'));
    process.exit(1);
  }

  const tasks = new Listr([
    {
      title: 'Copy project files',
      task: () => copyTemplateFiles(options),
    },
    {
      title: 'Uptade manifest.json',
      task: () => modifyManifestFile(options),
    },
    {
      title: 'Uptade hello.ux',
      task: () => modifyHelloUx(options),
    },
    {
      title: 'Uptade app icon',
      task: () => modifyIcon(options),
    },
  ]);

  await tasks.run();
  console.log('%s Project ready', chalk.green.bold('DONE'));
  return true;
}
