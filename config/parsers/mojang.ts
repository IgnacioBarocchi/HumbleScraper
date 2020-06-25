export default function (response: {
  url: string;
  status: number;
  statusText: string;
}) {
  console.log(`response url: ${decodeURIComponent(response.url)}`);
  console.log(`response status: ${response.status}`);
  console.log(`response status text: ${response.statusText}`);
}
