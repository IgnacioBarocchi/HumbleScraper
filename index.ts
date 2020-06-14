import { urlBuilder } from "./urlBuilder";

const clientUI = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

clientUI.question("Choose a word >", function (userInput: string) {
  urlBuilder.words.push(userInput.trim());
  const requestedUrl = encodeURI(
    urlBuilder.path.build(urlBuilder.words[urlBuilder.words.length - 1])
  );
  console.log(requestedUrl);
});
