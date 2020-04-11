import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

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

    console.log('%s Project ready', chalk.green.bold('DONE'));
    return true;
}