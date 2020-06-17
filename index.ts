import { multiUrlGenerator } from "./lib/multiUrlGenerator";
import * as request from "request";
import * as cheerio from "cheerio";

const clientUI = require("readline").createInterface({
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
  let arrayOfObjects: { $home: string; $name: string }[] = new Array().fill(
    null
  );
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

clientUI.question("type <website>, <routes> => ", function (userInput: string) {
  const websiteAndPath: string[] = new Array()
    .fill(null)
    .concat(
      userInput
        .split(",")
        .filter((item: string, index: number) => index % 2 === 0)
    )
    .concat(
      userInput
        .split(",")
        .filter((item: string, index: number) => index % 2 !== 0)
    );
  const requestedUrl = multiUrlGenerator(
    "http://$home/$name",
    arrayOfObjectsFactory(websiteAndPath)
  );
  wnp.forEach(function (item: string, index: number) {
    if (index < wnp.length / 2) {
      arrayOfObjects.push(
        new Url(wnp[index], wnp[wnp.length / 2 + index]).createObject()
      );
    } else {
      return;
    }
  });
  // return arrayOfObjects;
}




clientUI.question("type <website>, <routes> => ", function (userInput: string) {
  const websiteAndPath: string[] = new Array()
    .fill(null)
    .concat(
      userInput
        .split(",")
        .filter((item: string, index: number) => index % 2 === 0)
    )
    .concat(
      userInput
        .split(",")
        .filter((item: string, index: number) => index % 2 !== 0)
    );
  const requestedUrl = multiUrlGenerator(
    "http://$home/$name",
    arrayOfObjectsFactory(websiteAndPath)
  );
  requestedUrl.forEach((item, index, array) => getRequest(array[index]));
});
