import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import Listr from 'listr';
import { promisify } from 'util';
import replace from 'replace-in-file';

const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyTemplateFiles(options) {
    return copy(options.templateDirectory, options.targetDirectory, {
        clobber: false,
    });
}

function modifyManifestFile(options) {

    const manifestPath = `${options.targetDirectory}/src/manifest.json`;

    fs.readFile(manifestPath, 'utf8', (error, manifestJson) => {
        if (error) {
            console.log("File read failed:", error)
            return
        }

        const manifest = JSON.parse(manifestJson);
        
        manifest.package = options.packageName;
        manifest.name = options.appName;

        // update manifest
        fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8', (error) => {
            if (error) {
                console.log("File read failed:", error)
                return
            }
        });
    });
}

async function modifyHelloUx(options) {
    const helloUxPath = `${options.targetDirectory}/src/Hello/hello.ux`;

    const replaceOptions = {
        files: helloUxPath,
        from: '{{sourceUrl}}',
        to: options.sourceUrl,
    };

    try {
        const results = await replace(replaceOptions)
        console.log('Replacement results:', results);
    }
    catch (error) {
        console.error('Error occurred:', error);
    }
}

export async function createProject(options) {
    options = {
        ...options,
        targetDirectory: options.targetDirectory ||
            `${process.cwd()}/${options.packageName.toLowerCase()}`,
    };

    const templateDir = path.resolve(
        __filename,
        '../../templates/quickapp'
    );

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
        }
    ]);

    await tasks.run();
    console.log('%s Project ready', chalk.green.bold('DONE'));
    return true;
}