import { multiUrlGenerator } from './lib/multiUrlGenerator';
import fetch from 'node-fetch';
import console from 'console';
import yargs from 'yargs';
import { generalTransformer } from './config/parsers/ulr.parser';
const PATH = './config/url_components/';
const MODE = yargs.argv._[0];

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

async function main(mode: string) {
  for (const url of await getUrls(`${mode}.urls.json`).then((x) => x)) {
    try {
      const response = await fetch('https://' + url);
      generalTransformer(response);
    } catch (err) {
      console.warn(err);
    }
  }
  process.exit(0);
}

main(MODE);
