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

function arrayOfObjectsFactory(website: string[], path: string[]) {
  let voidArray = [];
  for (let i = 0; i < website.length; i++) {
    let obj: {} = new Url(website[i], path[i]).createObject();
    voidArray.push(obj);
  }
  return voidArray;
}

clientUI.question("type <website>, <routes> => ", function (userInput: string) {
  const userArray: string[] = userInput.split(",");
  let website: string[] = userArray.filter((a, i) => i % 2 === 0);
  let path: string[] = userArray.filter((a, i) => i % 2 !== 0);
  const requestedUrl = multiUrlGenerator(
    "http://$home/$name",
    arrayOfObjectsFactory(website, path)
  );
  console.log(requestedUrl);
});
