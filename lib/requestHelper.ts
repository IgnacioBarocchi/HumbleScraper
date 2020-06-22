export const responseHandler = (
  error: string | undefined | null,
  response: { statusCode: number },
): void => {
  if (!error && response.statusCode === 200) {
    console.log('OK');
  } else if (error) {
    console.warn('KO: ', error);
  } else {
    console.warn('response.statusCode: undefined');
  }
};
