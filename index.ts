import { urlBuilder } from "./urlBuilder";

const clientUI = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

clientUI.question("args:baseUrl,route >", function (userInput: string) {
  const args: string[] = userInput.split(",");
  const requestedUrl = urlBuilder(args[0].trim(), encodeURI(args[1].trim()));
  console.log(requestedUrl);
});
