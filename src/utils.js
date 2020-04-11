export const getManifestFilePath = (options) => `${options.targetDirectory}/src/manifest.json`; 

export const getUxFilePath = (options) => `${options.targetDirectory}/src/Hello/hello.ux`;

export const getTargetDirectory = (options) => `${process.cwd()}/${options.packageName.toLowerCase()}`;

export const getUpdatedManifest = (options) => {
    const manifest = JSON.parse(manifestJson);
        
    manifest.package = options.packageName;
    manifest.name = options.appName;

    return JSON.stringify(manifest, null, 2);
}