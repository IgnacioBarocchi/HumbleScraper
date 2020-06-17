import { multiUrlGenerator } from "./multiUrlGenerator";

const clientUI = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Url {
  $home: string;
  $name: string;
  constructor($home: string, $name: string) {
    this.$home = $home;
    this.$name = $name;
  }
  createObject(): any {
    return {
      $home: this.$home,
      $name: this.$name,
    };
  }
}

function arrayOfObjectsFactory(wnp: string[]) {
  //The left side of this array contains the names of the websites and the right side contains the names of the paths.
  let arrayOfObjects: { $home: string; $name: string }[] = new Array().fill(
    null
  );
  for (let i = 0; i < wnp.length / 2; i++) {
    arrayOfObjects.push(
      new Url(wnp[i], wnp[wnp.length / 2 + i]).createObject()
    );
  }
  return arrayOfObjects;
}

clientUI.question("type <website>, <routes> => ", function (userInput: string) {
  const websiteAndPath: string[] = new Array()
    .fill(null)
    .concat(userInput.split(",").filter((a, i) => i % 2 === 0))
    .concat(userInput.split(",").filter((a, i) => i % 2 !== 0));
  const requestedUrl = multiUrlGenerator(
    "http://$home/$name",
    arrayOfObjectsFactory(websiteAndPath)
  );
  console.log(requestedUrl);
});
