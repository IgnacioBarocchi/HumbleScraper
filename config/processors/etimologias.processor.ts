import { Response } from 'node-fetch';
import cheerio from 'cheerio';
import FirebaseClient from '../../lib/FirebaseClient';
const FIREBASE_COLLECTION_NAME = 'etymologies';
const CUTOFF_EXPRESSION =
  'Avísanos si tienes más datos o si encuentras \nalgún error.';

export type entry = { word: string; etymology: string };

function toDocument(webTitle: string, webContent: string): entry {
  return {
    word: webTitle,
    etymology: webContent,
  };
}

const getDefinition = ($html: Cheerio) => {
  const definition = $html
    .find('p')
    .text()
    // match any text from <p> elements prior to the cutoff expression
    .match(new RegExp(`([\\s\\S]*.*?)${CUTOFF_EXPRESSION}`, 'g'));

  // if there's a definition, remove garbage characters and return it
  return definition
    ? definition[0]
        .replace(CUTOFF_EXPRESSION, '')
        .trim()
        .replace(/^\s*[\r\n]/gm, '')
    : '';
};

export default async function (response: Response): Promise<void> {
  const responseText = await response.textConverted();
  const $html = cheerio.load(responseText)('html');

  const title = $html.find('h3').text();
  const text = getDefinition($html);

  if (!title || !text) {
    throw new Error('Entry not found');
  }

  FirebaseClient.saveDocument(
    FIREBASE_COLLECTION_NAME,
    toDocument(title, text),
    title
  );
}
