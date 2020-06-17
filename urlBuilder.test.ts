import { multiUrlGenerator } from "./multiUrlGenerator";
//"This usually means that you are trying to import a file which Jest cannot parse, e.g. it's not plain JavaScript."
//dont use npx test, ts file needs to be compiled
class Url {
  $home: string;
  $name: string;
  constructor($home: string, $name: string) {
    this.$home = $home;
    this.$name = $name;
  }
  createObject(): any {
    return {
      $home: this.$home,
      $name: this.$name,
    };
  }
}

function arrayOfObjectsFactory(website: string[], path: string[]) {
  let voidArray = [];
  for (let i = 0; i < website.length; i++) {
    let obj: {} = new Url(website[i], path[i]).createObject();
    voidArray.push(obj);
  }
  return voidArray;
}
function simulateUserquery() {
  const userArray: string[] = "wikipedia.org,banana,comida.cl,empanadas,chile.etimologias.net,amigo,cinemark.com,caballo".split(
    ","
  );
  let website: string[] = userArray.filter((a, i) => i % 2 === 0);
  let path: string[] = userArray.filter((a, i) => i % 2 !== 0);
  const requestedUrl = multiUrlGenerator(
    "http://$home/$name",
    arrayOfObjectsFactory(website, path)
  );
  return requestedUrl;
}

test("baseUrl + path", () => {
  expect(simulateUserquery()).toBe([
    "http://wikipedia.org/banana",
    "http://comida.cl/empanadas",
    "http://chile.etimologias.net/amigo",
    "http://cinemark.com/caballo",
  ]);
});
