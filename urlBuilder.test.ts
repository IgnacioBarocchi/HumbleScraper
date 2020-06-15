import { urlBuilder } from "./urlBuilder";

test("baseUrl + path", () => {
    expect(urlBuilder("https://en.wikipedia.org/wiki/", "Gordo")).toBe(
      "https://en.wikipedia.org/wiki/Gordo"
    );
  });
  