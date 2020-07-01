import { Response } from 'node-fetch';

export default function (response: Response) {
  console.log(`response url: ${decodeURIComponent(response.url)}`);
  console.log(`response status: ${response.status}`);
  console.log(`response status text: ${response.statusText}`);
}
