export const urlBuilder = {
    baseUrl: "https://es.wikipedia.org/",
    path: {
      format: "/wiki/{{word}}",
      build: function (word: string) {
        return urlBuilder.baseUrl + this.format.replace("{{word}}", word);
      },
    },
    words: ["Zapato", "Pato", "Pirámide"],
  };
