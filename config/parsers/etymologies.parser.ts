import { Response } from 'node-fetch';
import cheerio from 'cheerio';
const IGNORE_SELECTORS = [
  'header',
  'nav',
  'h1',
  'h2',
  'input',
  'button',
  'img',
  'div',
  'section',
  'sup',
  'table',
  'tbody',
  'tr',
  'td',
  'blockquote',
  'footer',
  'font',
];
const IGNORE_SENTENCES = [
  'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ',
  'Fuentes:',
  'MiembrosAutorizadossolamente',
  'Avísanossitienesmásdatososiencuentrasalgúnerror',
  'MiembrosAutorizadossolamente:',
];

function sanitized(text: string[]): string {
  return (
    text
      // .join(',')
      // .split(' ')
      .filter(Boolean)
      // .filter((p) => p || p != null)
      .join(' ')
  );
}

export type entry = { word: string; etymology: string };

function toDocument(webTitle: string, webContent: string): entry {
  return {
    word: webTitle,
    etymology: webContent,
  };
}

export default async function (response: Response): Promise<entry> {
  const html = () => response.text();
  return html().then(function (html) {
    const $: CheerioStatic = cheerio.load(html);
    const $html = $('html');
    const $definition = $html
      .find('p')
      .text()
      // match any text from <p> elements prior to "Avísanos"
      .match(/([\s\S]*.*?)Avísanos/g);

    const title = $html.find('h1').text();
    const text = $definition
      ? $definition[0].replace('Avísanos', '').trim()
      : '';
    return toDocument(title, text);
  });
}
