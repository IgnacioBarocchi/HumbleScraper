import { multiUrlGenerator } from './lib/multiUrlGenerator';
import { responseHandler } from './lib/requestHelper';
import readline from 'readline';
// eslint-disable-line
const request = require('request');

const clientUI = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function createObject(
  home: string,
  name: string
): { $home: string; $name: string } {
  return {
    $home: home,
    $name: name,
  };
}

function arrayOfObjectsFactory(wnp: string[]) {
  //The left side of this array contains the names of the websites and the right side contains the names of the paths.
  // @ts-ignore
  const arrayOfObjects: { $home: string; $name: string }[] = [].fill(null);
  wnp.forEach(function (item: string, index: number) {
    if (index < wnp.length / 2) {
      arrayOfObjects.push(
        createObject(wnp[index], wnp[wnp.length / 2 + index])
      );
    } else {
      return;
    }
  });
  return arrayOfObjects;
}

clientUI.question('type <website>, <routes> => ', function (userInput: string) {
  const websiteAndPath: string[] = ['']
    // @ts-ignore
    .fill(null)
    .concat(
      userInput
        .split(',')
        .filter((item: string, index: number) => index % 2 === 0)
    )
    .concat(
      userInput
        .split(',')
        .filter((item: string, index: number) => index % 2 !== 0)
    );
  const requestedUrl = multiUrlGenerator(
    'http://$home/$name',
    arrayOfObjectsFactory(websiteAndPath)
  );
  // requestedUrl.forEach((item, index, array) => getRequest(array[index]));

  console.log(
    request('https://es.wikipedia.org/wiki/Los_simuladores', responseHandler)
      .uri.href,
  );
});
