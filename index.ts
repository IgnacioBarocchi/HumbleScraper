import { multiUrlGenerator } from "./multiUrlGenerator";
type UserObject = {
  $home: string;
  $name: string;
};
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

clientUI.question("type <website>, <routes> => ", function (userInput: string) {
  const userArray: string[] = userInput.split(",");
  const newUrl = new Url(userArray[0], userArray[1]);
  const requestedUrl = multiUrlGenerator("http://$home/$name", [newUrl.createObject()]);
  console.log(requestedUrl);

});
