export const urlGen = {
    baseUrl: "https://es.wikipedia.org/",
    path: {
      format: "/wiki/{{word}}",
      build: function (word: string) {
        return urlGen.baseUrl + this.format.replace("{{word}}", word);
      },
    },
    words: ["Zapato", "Pato", "Pirámide"],
  };
