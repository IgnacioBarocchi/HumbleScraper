"use strict";
exports.__esModule = true;
exports.urlBuilder = void 0;
exports.urlBuilder = function (sourse, item) {
    var generatedUrl = {
        path: {
            baseUrl: sourse,
            format: item,
            build: function () {
                return this.baseUrl + this.format;
            }
        },
        words: ["Zapato", "Pato", "Pirámide"]
    };
    return generatedUrl.path.build();
};
