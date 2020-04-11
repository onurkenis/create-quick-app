import arg from 'arg';

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
            message: 'Enter your app name:',
        });
    }

    if (!options.packageName) {
        questions.push({
            type: 'input',
            name: 'packageName',
            message: 'Enter your package name:',
            default: 'com.onurkenis.quickapp'
        });
    }

    if (!options.sourceUrl) {
        questions.push({
            type: 'input',
            name: 'sourceUrl',
            message: 'Enter your source url:',
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
    const options = parseArgumentsIntoOptions(args);
    options = await promptForMissingOptions(options);

    console.log(options)
}