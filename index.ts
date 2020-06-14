let requestedUrl: string;
const clientUI = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const urlGen: {
  baseUrl: string;
  path: {
    format: string;
    build: any;
  };
  words: string[];
} = {
  baseUrl: "https://es.wikipedia.org/",
  path: {
    format: "/wiki/{{word}}",
    build: function (word: string) {
      return urlGen.baseUrl + this.format.replace("{{word}}", word);
    },
  },
  words: ["Zapato", "Pato", "Pirámide"],
};

clientUI.question("Choose a word >", function (userInput: string) {
  urlGen.words.push(userInput.trim());
  requestedUrl = encodeURI(
    urlGen.path.build(urlGen.words[urlGen.words.length - 1])
  );
  console.log(requestedUrl);
});

