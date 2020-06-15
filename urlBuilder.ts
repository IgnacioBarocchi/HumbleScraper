export const urlBuilder = function (sourse: string, item: string) {
  const generatedUrl: {
    path: {
      baseUrl: string;
      format: string;
      build: () => string;
    };
    words: string[];
  } = {
    path: {
      baseUrl: sourse,
      format: item,
      build: function () {
        return this.baseUrl + this.format;
      },
    },
    words: ["Zapato", "Pato", "Pirámide"],
  };
  return generatedUrl.path.build();
};
