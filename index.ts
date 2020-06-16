import { multiUrlGenerator } from "./multiUrlGenerator";

const clientUI = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

clientUI.question("args:baseUrl,route >", function (userInput: string) {
  const args: any[] = userInput.split(",");/* string and obj */
  // const requestedUrl = multiUrlGenerator(args[0].trim(), args[1]);
  // console.log(requestedUrl);
});
