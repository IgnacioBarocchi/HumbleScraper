"use strict";
exports.__esModule = true;
var urlBuilder_1 = require("./urlBuilder");
test("baseUrl + path", function () {
    expect(urlBuilder_1.urlBuilder("https://en.wikipedia.org/wiki/", "Gordo")).toBe("https://en.wikipedia.org/wiki/Gordo");
});
