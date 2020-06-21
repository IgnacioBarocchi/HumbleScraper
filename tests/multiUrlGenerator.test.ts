import { multiUrlGenerator } from '../lib/multiUrlGenerator';

describe('library', () => {
  it('returns an array of urls', () => {
    const input = [
      { $home: 'hola', $name: 'chau' },
      { $home: "jij?'ái", $name: 'jaja' },
    ];
    const urls = multiUrlGenerator('http://$home/$name', input);

    expect(urls.length).toBe(input.length);
    expect(urls).toStrictEqual([
      'http://hola/chau',
      "http://jij%3F'%C3%A1i/jaja",
    ]);
  });

  it('throws if input is invalid', () => {
    const input = 'lol';
    // @ts-ignore
    expect(() => multiUrlGenerator('http://$home/$name', input)).toThrow(
      TypeError,
    );
  });
});
