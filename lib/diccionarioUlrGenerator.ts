import cheerio from 'cheerio';
import fetch from 'node-fetch';

const alphabet = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'ñ',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

export const diccionarioUlrGenerator = async function (): Promise<string[]> {
  let generaterdUlrs: string[] = [];
  for (const letter of alphabet) {
    let prefix = `https://sinonimos.woxikon.es/es-${letter}`;
    let response = await fetch(prefix);
    const responseText = await response.textConverted();
    const $html = cheerio.load(responseText)('html');
    let limit = $html.find('.number-list > li').length;

    for (let pageIndex = 1; pageIndex < limit; pageIndex++) {
      let url = `${prefix}-${pageIndex}`;
      generaterdUlrs.push(url);
    }
  }
  return generaterdUlrs;
};

diccionarioUlrGenerator();
//list-from-to
