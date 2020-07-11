import { Response } from 'node-fetch';
import cheerio from 'cheerio';

function sanitizedArray(text: string): string[] {
  const textToArray = text
    .replace(/(\r\n|\n|\r)/gm, '')
    .replace(/^/gm, `",`)
    .replace(/$/gm, `",`)
    .replace(/\n/, '')
    .replace(/ /gim, ',')
    .replace(/\"/gim, '')
    .split(/[,]+/)
    .join(',')
    .split(',');
  return textToArray;
}

function parseLargeArray(items: string[]): string[] {
  return JSON.parse(`["${items.join('","')}"]`).filter(
    (v: string, i: number, a: string[]) => a.indexOf(v) == i
  );
}

function toDocument(
  word: string,
  synonyms: string[],
  similar: string[],
  source: string
): {} {
  return {
    word: word,
    synonyms: synonyms,
    similarWords: similar,
    source: source,
  };
}

export default async function (response: Response): Promise<void> {
  let shortDefinition: string;
  let synonyms: string[] = [];
  let similarWords: string[] = [];

  const responseText = await response.textConverted();
  const $html = cheerio.load(responseText)('html');
  const word = $html.find('.page-header-text > span').text();
  // const shortDefinitionGroup = $html.find('.synonyms-list-group.first').text();
  const upperSynonyms = $html.find('.upper-synonyms').text();
  const lowerSynonyms = $html.find('.lower-synonyms').text();
  const inlineSimilarWords = $html
    .find('.col-md-12')
    .find('.similar-words-list-inline')
    .text();

  if ($html.find('h1').text() === 'Página no encontrada') {
    console.log('Not such a website found!');
    return;
  }

  //shortDefinition = shortDefinitionGroup;

  similarWords = similarWords
    .concat(sanitizedArray(inlineSimilarWords))
    .filter((e) => e !== word)
    .filter(Boolean);
  synonyms = synonyms
    .concat(sanitizedArray(upperSynonyms).concat(sanitizedArray(lowerSynonyms)))
    .filter(Boolean);

  const synonymsList = parseLargeArray(synonyms);
  const similarWordsList = parseLargeArray(similarWords);

  console.log(toDocument(word, synonymsList, similarWordsList, response.url));
}
