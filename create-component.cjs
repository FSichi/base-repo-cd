const execSync = require('child_process').execSync;

const arg1 = process.argv[2] || 'component';
let arg2 = process.argv[3] || 'MyComponent';

switch (arg1) {
    case 'component':
        arg2 = arg2.charAt(0).toUpperCase() + arg2.slice(1);
        execSync(`npx --yes generate-react-cli component ${arg2}`, { stdio: [0, 1, 2] });
        break;

    case 'page':
        arg2 = arg2.charAt(0).toUpperCase() + arg2.slice(1);
        arg2 = arg2.replace(/Page$/g, '');
        execSync(`npx --yes generate-react-cli component --type=page ${arg2}Page`, {
            stdio: [0, 1, 2],
        });
        break;

    default:
        console.log('Invalid arguments');
        break;
}
