import { multiUrlGenerator } from './lib/multiUrlGenerator';
import fetch from 'node-fetch';

// Test fetching Wiki articles
const requestUrls = multiUrlGenerator(
  'https://$lang.wikipedia.org/wiki/$article',
  [
    { $lang: 'en', $article: 'Plato' },
    { $lang: 'es', $article: 'Aristóteles' },
  ]
);

async function main() {
  for (const url of requestUrls) {
    try {
      const response = await fetch(url);
      console.log(
        `Called url: ${url} - with response status:`,
        response.status
      );
    } catch (err) {
      console.warn(err);
    }
  }
  process.exit(0);
}

console.log('Urls:', requestUrls);

// Run program
main();
