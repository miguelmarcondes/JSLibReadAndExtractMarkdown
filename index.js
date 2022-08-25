const chalk = require('chalk');
const fs = require('fs');

function extractLinks(text) {
  const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
  const arrayResults = [];
  let temp;
  while((temp = regex.exec(text)) !== null) {
    arrayResults.push({ [temp[1]]: temp[2] })
  }
  return arrayResults.length === 0 ? 'there are no links' : arrayResults;
}

function handleError(error) {
  throw new Error(chalk.red(error.code, 'there is no file on the determined path'));
}

async function catchFile(filePath) {
  const encoding = 'utf-8';
  try {
    const text = await fs.promises.readFile(filePath, encoding)
    return extractLinks(text);
  } catch(error) {
    handleError(error);
  }
}

module.exports = catchFile;