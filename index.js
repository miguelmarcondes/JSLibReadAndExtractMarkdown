const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

function extractLinks(text) {
  const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
  const arrayResults = [];
  let temp;
  while((temp = regex.exec(text)) !== null) {
    arrayResults.push({ [temp[1]]: temp[2] })
  }
  return arrayResults.length === 0 ? 'There are no links' : arrayResults;
}

function handleError(error) {
  throw new Error(chalk.red(error.code, 'There is no file in the path determined'));
}

async function catchFiles(filePath) {
  const absolutePath = path.join("__dirname",'..', filePath);
  const encoding = 'utf-8';
  try {
    const files = await fs.promises.readdir(absolutePath, { encoding });
    const result = await Promise.all(files.map(async (file) => {
      const localFile = `${absolutePath}/${file}`;
      const text = await fs.promises.readFile(localFile, encoding);
      return extractLinks(text);
    }));
    return result;
  } catch (error) {
    return handleError(error);
  }
}

module.exports = catchFiles;