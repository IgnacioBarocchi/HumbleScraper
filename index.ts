import { multiUrlGenerator } from './lib/multiUrlGenerator';
import fetch, { Response } from 'node-fetch';
import console from 'console';
import { userConfig } from './client/userConfig';
const URL_CONFIG_PATH = './config/url_components';
const PARSER_PATH = './config/parsers';

async function getUrls(configFileName: string): Promise<string[]> {
  const urlConfig = await import(`${URL_CONFIG_PATH}/${configFileName}`);
  if (urlConfig.baseTemplate && urlConfig.components) {
    return multiUrlGenerator(urlConfig.baseTemplate, urlConfig.components);
  }
  console.error('Wrong url config format');
  process.exit(0);
}

async function getParser(
  parserFileName: string
): Promise<(arg0: Response) => void> {
  const parser = await import(`${PARSER_PATH}/${parserFileName}`);
  if (parser.default) {
    return parser.default;
  } else {
    console.warn('The imported module must have an export default statement');
    process.exit(0);
  }
}

async function main(mode: string) {
  const parser = await getParser(`${mode}.parser.ts`);
  const urls = await getUrls(`${mode}.urls.json`);
  for (const url of urls) {
    try {
      const response = await fetch(url);
      parser(response);
    } catch (err) {
      console.warn(err);
    }
  }
  process.exit(0);
}
