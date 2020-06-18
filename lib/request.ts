const request = require("request");

export const getRequest = (website: string) => {
  request(website, function (
    error: string,
    response: { statusCode: number },
    html: any
  ) {
    console.log("Website: ", website);
    if (!error && response.statusCode == 200) {
      console.log("CONNECTED TO: ", website);
    } else {
      console.log("FAILED, ERROR TYPE: ", error);
    }
  });
};
