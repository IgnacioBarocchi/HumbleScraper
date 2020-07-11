import cheerio from 'cheerio';
import fetch from 'node-fetch';
import { diccionarioUlrGenerator } from '../../lib/diccionarioUlrGenerator';

function sanitizedText(text: string): string {
  const textToString = text
    .replace(/(\r\n|\n|\r)/gm, '')
    .split(/[ ,]+/)
    .join('", "');
  return textToString;
}

async function extract() {
  const urls = await diccionarioUlrGenerator();
  for (const url of urls) {
    const response = await fetch(url);
    const responseText = await response.textConverted();
    const $html = cheerio.load(responseText)('html');

    if ($html.find('h1').text() === 'Página no encontrada') {
      console.log('Not such a website found!');
      return;
    }

    $html.find('.list-from-to').each((i, el) => {
      const item = cheerio.load(responseText)(el).text();
      const arrayE = JSON.parse(`[${sanitizedText(item)}]`);
      console.log(arrayE);
    });
  }
}

extract();
