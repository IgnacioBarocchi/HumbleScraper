"use strict";
exports.__esModule = true;
var multiUrlGenerator_1 = require("./multiUrlGenerator");
//"This usually means that you are trying to import a file which Jest cannot parse, e.g. it's not plain JavaScript."
//dont use npx test, ts file needs to be compiled
var Url = /** @class */ (function () {
    function Url($home, $name) {
        this.$home = $home;
        this.$name = $name;
    }
    Url.prototype.createObject = function () {
        return {
            $home: this.$home,
            $name: this.$name
        };
    };
    return Url;
}());
function arrayOfObjectsFactory(website, path) {
    var voidArray = [];
    for (var i = 0; i < website.length; i++) {
        var obj = new Url(website[i], path[i]).createObject();
        voidArray.push(obj);
    }
    return voidArray;
}
function simulateUserquery() {
    var userArray = "wikipedia.org,banana,comida.cl,empanadas,chile.etimologias.net,amigo,cinemark.com,caballo".split(",");
    var website = userArray.filter(function (a, i) { return i % 2 === 0; });
    var path = userArray.filter(function (a, i) { return i % 2 !== 0; });
    var requestedUrl = multiUrlGenerator_1.multiUrlGenerator("http://$home/$name", arrayOfObjectsFactory(website, path));
    return requestedUrl;
}
test("baseUrl + path", function () {
    expect(simulateUserquery()).toStrictEqual([
        "http://wikipedia.org/banana",
        "http://comida.cl/empanadas",
        "http://chile.etimologias.net/amigo",
        "http://cinemark.com/caballo",
    ]);
});
