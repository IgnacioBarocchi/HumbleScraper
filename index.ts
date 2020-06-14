import { urlGen } from "./urlBuilder";

const clientUI = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

clientUI.question("Choose a word >", function (userInput: string) {
  urlGen.words.push(userInput.trim());
  const requestedUrl = encodeURI(
    urlGen.path.build(urlGen.words[urlGen.words.length - 1])
  );
  console.log(requestedUrl);
});
