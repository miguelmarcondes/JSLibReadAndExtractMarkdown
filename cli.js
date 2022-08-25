const chalk = require('chalk');
const catchFile = require('./index');
const validateURL = require('./http-validacao');

const path = process.argv;

async function processText(filePath) {
  const result = await catchFile(filePath[2]);
  if (filePath[3] === 'validate') {
    console.log(chalk.yellow('validated links'), await validateURL(result));
  } else {
    console.log(chalk.yellow('link list'), result);
  }
}

processText(path);