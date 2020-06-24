import { multiUrlGenerator } from './lib/multiUrlGenerator';
import fetch from 'node-fetch';
import console from 'console';
import { wikipediaTransformer } from './config/parsers/wikipedia.parser';
// Test fetching Wiki articles

async function getUrls(path: string) {
  const requestUrls = multiUrlGenerator(
    await fetch(path) /*await import(path)*/
      .then((jsonFile) => jsonFile.json())
      .then((data) => data.linkto),
    await fetch(path)
      .then((jsonFile) => jsonFile.json())
      .then((data) => data.components)
  );
  return requestUrls;
}

async function main() {
  for (const url of await getUrls(
    './config/url_components/wikipedia.urls.json'
  )) {
    try {
      const response = await fetch(url);
      wikipediaTransformer(response.body);
    } catch (err) {
      console.warn(err);
    }
  }
  process.exit(0);
}

main();
