import { multiUrlGenerator } from './lib/multiUrlGenerator';
import fetch from 'node-fetch';
import console from 'console';
import { wikipediaTransformer } from './config/parsers/wikipedia.parser';
// Test fetching Wiki articles
const PATH = './config/url_components/wikipedia.urls.js';

async function wikipediaUrls() {
  const requestUrls = multiUrlGenerator(
    await import(PATH).then((jsonFile) => jsonFile.linkto.json()),
    await import(PATH).then((jsonFile) => jsonFile.components.json())
  );
  return requestUrls;
}

async function main() {
  for (const url of await wikipediaUrls()) {
    try {
      const response = await fetch(url);
      wikipediaTransformer(response.body);
    } catch (err) {
      console.warn(err);
    }
  }
  process.exit(0);
}

// Run program
main();
