import { Response } from 'node-fetch';
import cheerio from 'cheerio';
import { postDocumentToDb } from '../../lib/dbClient';
const FIREBASE_COLLECTION_NAME = 'etymologies';

export type entry = { word: string; etymology: string };

function toDocument(webTitle: string, webContent: string): entry {
  return {
    word: webTitle,
    etymology: webContent,
  };
}

export default function (response: Response): void {
  const html = () => response.text();
  html().then(function (html) {
    const $: CheerioStatic = cheerio.load(html);
    const $html = $('html');
    const $definition = $html
      .find('p')
      .text()
      // match any text from <p> elements prior to "Avísanos"
      .match(
        /([\s\S]*.*?)Avísanos si tienes más datos o si encuentras algún error./g
      );

    const title = $html.find('h1').text();
    const text = $definition
      ? $definition[0]
          .replace(
            'Avísanos si tienes más datos o si encuentras algún error.',
            ''
          )
          .trim()
      : '';
    postDocumentToDb(FIREBASE_COLLECTION_NAME, toDocument(title, text), title);
  });
}
