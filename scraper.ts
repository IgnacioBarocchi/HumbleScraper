const request = require("request");
const cheerio = require("cheerio");

// var website = 1;
// request(website, function (
//   error: string,
//   response: { statusCode: number }
//   //html: any/*cheerio load html*/
// ) {
//   if (!error && response.statusCode == 200) {
//     console.log("connencted");
//   } else {
//     console.log("fail", error);
//   }
// });
const website:string ="a";
request
  .get(website)
  .on("response", function (response: { statusCode: number; headers: any }) {
    console.log(response.statusCode); // 200
    console.log(response.headers["content-type"]); // 'image/png'
  })
  .pipe(request.put("http://mysite.com/img.png"));
