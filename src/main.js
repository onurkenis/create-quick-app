import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import Listr from 'listr';

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
            task: () => console.log("COPY_PROJECT_FILE"),
        },
        {
            title: 'Uptade manifest.json',
            task: () => console.log("UPDATE_MANIFEST_FILE"),
        },
        {
            title: 'Uptade hello.ux',
            task: () => console.log("UPDATE_HELLO_UX"),
        }
    ]);

    await tasks.run();
    console.log('%s Project ready', chalk.green.bold('DONE'));
    return true;
}