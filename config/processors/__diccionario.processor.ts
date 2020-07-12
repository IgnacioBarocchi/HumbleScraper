import cheerio from 'cheerio';
import fetch from 'node-fetch';
import { collection } from '../url/words.urls';

function sanitizedText(text: string): string[] {
  const textToArray = text.replace(/(\r\n|\n|\r)/gm, '').split(/[ ,]+/);
  return textToArray;
}

async function saveWords() {
  let wordList: string[] = [];
  //const urls = await diccionarioUlrGenerator();
  const urls = collection;
  //   const urls = [
  //     'https://sinonimos.woxikon.es/es-r-14',
  //     'https://sinonimos.woxikon.es/es-f-16',
  //     'https://sinonimos.woxikon.es/es-g-5',
  //   ];
  for (const url of urls) {
    const response = await fetch(encodeURIComponent(url.replace(/\s/g, '')));
    const responseText = await response.textConverted();
    const $html = cheerio.load(responseText)('html');

    if ($html.find('h1').text() === 'Página no encontrada') {
      console.log('Not such a website found!');
      return;
    }

    $html.find('.list-from-to').each((i, el) => {
      const item = cheerio.load(responseText)(el).text();
      wordList = wordList.concat(
        sanitizedText(item)
          .filter(Boolean)
          .filter((v: string, i: number, a: string[]) => a.indexOf(v) == i)
      );
    });
  }
  console.log(wordList);
}

saveWords();
