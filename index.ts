import { multiUrlGenerator } from './lib/multiUrlGenerator';
import fetch from 'node-fetch';
import console from 'console';
import { wikipediaTransformer } from './config/parsers/wikipedia.parser';
const PATH = './config/url_components/';

async function getUrls(file: string) {
  const requestUrls = multiUrlGenerator(
    await import(PATH + file)
      .then((jsonFile) => jsonFile)
      .then((data) => data.linkto),

    await import(PATH + file)
      .then((jsonFile) => jsonFile)
      .then((data) => data.components)
  );

  return new Promise<string[]>((resolve, reject) => {
    resolve(requestUrls);
    reject('no files found');
  });
}

async function main() {
  for (const url of await getUrls('wikipedia.urls.json').then((x) => x)) {
    try {
      const response = await fetch(decodeURIComponent('https://' + url));
      wikipediaTransformer(response.body);
    } catch (err) {
      console.warn(err);
    }
  }
  process.exit(0);
}

main();
