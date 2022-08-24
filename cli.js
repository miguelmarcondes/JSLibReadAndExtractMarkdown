const chalk = require ('chalk');
const catchFiles = require ('./index');

const path = process.argv;

async function processText (filePath) {
    const result = await catchFiles(filePath[2]);
    console.log(chalk.yellow('link list'), result);
}

processText(path);