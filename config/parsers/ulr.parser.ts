export const generalTransformer = function (res: {
  url: string;
  status: number;
  statusText: string;
}) {
  console.log(
    `\n>response url: ${decodeURIComponent(res.url)}\n>response status: ${
      res.status
    }\n>response status text: ${res.statusText}\n`
  );
};
