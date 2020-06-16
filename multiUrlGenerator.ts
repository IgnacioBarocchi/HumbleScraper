type Component = { [replaceableKey: string]: string };

export const multiUrlGenerator = (fullPath: string, components: []) => {
  /*components: {replaceableKey:string}[] */
  // Map each of the components to a URL
  return components.map((component: Component) => {
    const urlReplaceableKeys = Object.keys(component);

    // Replace an object key found in the path with their corresponding values
    const replaceKeys = (path: string, replaceableKey: string) => {
      return path.replace(
        replaceableKey,
        encodeURIComponent(component[replaceableKey])
      );
    };

    // Reduce the component object into a fully replaced path
    // with fullPath = 'www.example.com/foo/bar'
    // {'foo': 'hey', 'bar': 'ho} => ['www.example.com/hey/ho']
    return urlReplaceableKeys.reduce(replaceKeys, fullPath);
  });
};
