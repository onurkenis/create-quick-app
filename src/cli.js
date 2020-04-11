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

export async function cli(args) {
    const options = parseArgumentsIntoOptions(args);
    console.log(options)
}