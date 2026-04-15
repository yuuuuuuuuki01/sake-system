declare module "iconv-lite" {
  export function decode(
    input: Uint8Array | Buffer | ArrayBuffer,
    encoding: string,
    options?: { stripBOM?: boolean }
  ): string;

  export function encode(input: string, encoding: string): Buffer;

  const iconv: {
    decode: typeof decode;
    encode: typeof encode;
  };

  export default iconv;
}
