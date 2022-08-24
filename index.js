const chalk = require('chalk');
const fs = require('fs');

function extractLinks(text) {
  const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
  const arrayResults = [];
  let temp;
  while((temp = regex.exec(text)) !== null) {
    arrayResults.push({ [temp[1]]: temp[2] })
  }
  return arrayResults;
}

function handleError(error) {
  throw new Error(chalk.red(error.code, 'não há arquivo no caminho'));
}

async function catchArquive(filePath) {
  const encoding = 'utf-8';
  try {
    const text = await fs.promises.readFile(filePath, encoding)
    console.log(extractLinks(text));
  } catch(error) {
    handleError(error);
  }
}

catchArquive('./arquive/texto1.md');