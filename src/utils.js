import { MANIFEST_PATH_IN_TEMPLATE, UX_FILE_PATH_IN_TEMPLATE } from './constants';

export const getUxFilePath = (options) => `${options.targetDirectory}/${UX_FILE_PATH_IN_TEMPLATE}`;

export const getManifestFilePath = (options) =>
  `${options.targetDirectory}/${MANIFEST_PATH_IN_TEMPLATE}`;

export const getTargetDirectory = (options) =>
  `${process.cwd()}/${options.packageName.toLowerCase()}`;

export const getUpdatedManifest = (options, manifestJson) => {
  const manifest = JSON.parse(manifestJson);

  manifest.package = options.packageName;
  manifest.name = options.appName;

  return JSON.stringify(manifest, null, 2);
};
