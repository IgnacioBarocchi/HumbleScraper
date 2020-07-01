import { Response } from 'node-fetch';
import cheerio from 'cheerio';
import { postDocumentToDB } from '../../lib/dbClient';

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
    return postDocumentToDB('testCollection', toDocument(title, text));
  });
}
//
//
