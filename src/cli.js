import arg from 'arg';
import inquirer from 'inquirer';
import { createProject } from './main';

function parseArgumentsIntoOptions(rawArgs) {
    const args = arg(
        {
            '--appName': String,
            '--packageName': String,
            '--url': String,
        },
        {
            argv: rawArgs.slice(2),
        }
    );
    console.log(args);
    return {
        appName: args['--appName'] || false,
        packageName: args['--packageName'] || false,
        sourceUrl: args['--url'] || false,
    };
}

async function promptForMissingOptions(options) {
    const questions = [];

    if (!options.appName) {
        questions.push({
            type: 'input',
            name: 'appName',
            message: 'What is your app name?',
        });
    }

    if (!options.packageName) {
        questions.push({
            type: 'input',
            name: 'packageName',
            message: 'What is your package name?',
            default: 'com.onurkenis.quickapp'
        });
    }

    if (!options.sourceUrl) {
        questions.push({
            type: 'input',
            name: 'sourceUrl',
            message: 'What is your source url?',
        });
    }

    const answers = await inquirer.prompt(questions);
    return {
        ...options,
        appName: options.appName || answers.appName,
        packageName: options.packageName || answers.packageName,
        sourceUrl: options.sourceUrl || answers.sourceUrl
    };
}

export async function cli(args) {
    let options = parseArgumentsIntoOptions(args);
    options = await promptForMissingOptions(options);
    
    await createProject(options);
}