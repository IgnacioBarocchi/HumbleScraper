import readline from 'readline';
const client = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
type ScraperMode = 'wikipedia' | 'minecraft';
const MODES: ReadonlyArray<ScraperMode> = ['wikipedia', 'minecraft'];
function mode(mode: string): string {
  return mode;
}

export const userConfig = function () {
  client.question(
    `What mode should I use? (available modes: ${MODES.join(', ')}) `,
    (MODE) => {
      if (!MODES.includes(MODE as ScraperMode)) {
        console.error(
          `Specified scraper mode "${MODE}" not found in config files.`
        );
        process.exit(0);
      }
      return mode(MODE);
      client.close();
    }
  );
};

// export const userConfig = function* (): Generator<void | string> {
//   yield client.question(
//     `What mode should I use? (available modes: ${MODES.join(', ')}) `,
//     (MODE) => {
//       if (!MODES.includes(MODE as ScraperMode)) {
//         console.error(
//           `Specified scraper mode "${MODE}" not found in config files.`
//         );
//         MODE_ = MODE; //side effect
//         process.exit(0);
//       }
//       client.close();
//     }
//   );
//   yield MODE_;
// };
