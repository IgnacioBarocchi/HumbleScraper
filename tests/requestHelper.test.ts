import { responseHandler } from '../lib/requestHelper';

describe('responseHandler', () => {
  it('should log "OK" when status is 200', () => {
    const response: { statusCode: number } = { statusCode: 200 };
    console.log = jest.fn();
    responseHandler(null, response);
    expect(console.log).toHaveBeenCalledWith('OK');
  });

  it('should log "response.statusCode: undefined" when no error was specified', () => {
    const response: { statusCode: number } = { statusCode: 500 };
    console.warn = jest.fn();
    responseHandler(null, response);
    expect(console.warn).toHaveBeenCalledWith('response.statusCode: undefined');
  });

  it('should log "KO" on error', () => {
    const response: { statusCode: number } = { statusCode: 200 };
    const error = 'error!';
    console.warn = jest.fn();
    responseHandler(error, response);
    expect(console.warn).toHaveBeenCalledWith('KO: ', error);
  });
});
