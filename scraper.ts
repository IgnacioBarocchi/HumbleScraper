const cheerio = require("cheerio");

export const scraper = (html: any, elementAtribute: string) => {
  const $$$ = cheerio.load(html);
  $$$(elementAtribute).each((index: number, element: any) => {
    return console.log(element);
  });
};
