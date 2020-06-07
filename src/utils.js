import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import {
  MANIFEST_PATH_IN_TEMPLATE,
  UX_FILE_PATH_IN_TEMPLATE,
  LOGO_PATH_IN_TEMPLATE,
  TEMPLATE_PATH,
} from './constants';

export const access = promisify(fs.access);

export const copy = promisify(ncp);

export const getUxFilePath = (options) => `${options.targetDirectory}/${UX_FILE_PATH_IN_TEMPLATE}`;

export const getManifestFilePath = (options) =>
  `${options.targetDirectory}/${MANIFEST_PATH_IN_TEMPLATE}`;

export const getTemplateTargetDirectory = (options) =>
  `${process.cwd()}/${options.packageName.toLowerCase()}`;

export const getTemplateSourceDirectory = () => path.resolve(__filename, TEMPLATE_PATH);

export const getLogoTargetDirectory = (options) =>
  `${process.cwd()}/${options.packageName.toLowerCase()}/${LOGO_PATH_IN_TEMPLATE}`;

export const getLogoSourceDirectory = (options) => path.resolve(process.cwd(), options.icon);

export const getUpdatedManifest = (options, manifestJson) => {
  const manifest = JSON.parse(manifestJson);

  manifest.package = options.packageName;
  manifest.name = options.appName;

  return JSON.stringify(manifest, null, 2);
};

export const asyncExec = (cmd) => {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      stdout ? resolve(stdout) : reject(stderr);
    });
  });
};
