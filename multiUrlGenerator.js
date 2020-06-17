"use strict";
exports.__esModule = true;
exports.multiUrlGenerator = void 0;
exports.multiUrlGenerator = function (fullPath, components) {
    // Map each of the components to a URL
    return components.map(function (component) {
        var urlReplaceableKeys = Object.keys(component);
        // Replace an object key found in the path with their corresponding values
        var replaceKeys = function (path, replaceableKey) {
            return path.replace(replaceableKey, encodeURIComponent(component[replaceableKey]));
        };
        // Reduce the component object into a fully replaced path
        // with fullPath = 'www.example.com/foo/bar'
        // {'foo': 'hey', 'bar': 'ho} => ['www.example.com/hey/ho']
        return urlReplaceableKeys.reduce(replaceKeys, fullPath);
    });
};
