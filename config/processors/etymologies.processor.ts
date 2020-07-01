import { Response } from 'node-fetch';
import cheerio from 'cheerio';
import {
  post_Document_To_DB,
  consoleog_My_Documents_From,
} from '../../lib/dbClient';

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

export default async function (response: Response) {
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
      ? $definition[0]
          .replace(
            ' Avísanos si tienes más datos o si encuentras algún error.',
            ''
          )
          .trim()
      : '';
    return post_Document_To_DB('testCollection', toDocument(title, text));
    consoleog_My_Documents_From('testCollection');
  });
}
//
//
