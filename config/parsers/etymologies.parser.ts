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

function toDocument(webTitle: string, webContent: string): {} {
  return {
    word: webTitle,
    etymology: webContent,
  };
}

export default async function (response: Response) {
  var paragraphs: string[] = [];
  var title: string = '';
  const html = () => response.text();
  await html()
    .then(function (html) {
      const $: CheerioStatic = cheerio.load(html);
      const $html = $('html');
      const $possibles = $html.find('body p');
      $possibles
        // .not((i, elem) => //TODO: make this work
        //   IGNORE_SELECTORS.some((selector) => $(elem).is(selector))
        // )
        .each((i, elem) => {
          let ignore = $(elem).text().trim().replace(/\s/g, '');
          IGNORE_SENTENCES.includes(ignore) //TODO: make this work
            ? false
            : paragraphs.push($(elem).text());
        });
      title = $('h3').text().trim();
      return toDocument(title, sanitized(paragraphs)); //REVIEW: this also can be below of this block by removing the then method can be removed
    })
    .then((result) => result);
}
