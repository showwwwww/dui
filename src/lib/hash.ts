import type { JSBaseType } from '@/types/common';

const calculateHash = (data: JSBaseType, algorithm: 'SHA-256' | 'MD5' = 'SHA-256'): string => {
  try {
    // Helper function to convert any value to a UTF-8 Uint8Array
    function anyToUint8Array(value: JSBaseType): Uint8Array {
      if (typeof value === 'string') {
        return stringToUint8Array(value);
      } else if (typeof value === 'number') {
        return stringToUint8Array(value.toString());
      } else if (typeof value === 'boolean') {
        return stringToUint8Array(value.toString());
      } else if (value === null || value === undefined) {
        return stringToUint8Array('');
      } else if (typeof value === 'object') {
        return stringToUint8Array(JSON.stringify(value));
      } else {
        throw new Error(`Unsupported data type: ${typeof value}`);
      }
    }

    // Helper function to convert a string to a UTF-8 Uint8Array
    function stringToUint8Array(str: string): Uint8Array {
      const encoder = new TextEncoder();
      return encoder.encode(str);
    }

    // Helper function to convert a Uint8Array to a hex string
    function uint8ArrayToHex(array: Uint8Array): string {
      return Array.from(array)
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
    }

    // Implement hash algorithms
    const hashFunctions: { [key: string]: (data: Uint8Array) => string } = {
      'SHA-256': (data) => {
        function rotateRight(n: number, x: number): number {
          return (x >>> n) | (x << (32 - n));
        }

        function choice(x: number, y: number, z: number): number {
          return (x & y) ^ (~x & z);
        }

        function majority(x: number, y: number, z: number): number {
          return (x & y) ^ (x & z) ^ (y & z);
        }

        function sigma0(x: number): number {
          return rotateRight(2, x) ^ rotateRight(13, x) ^ rotateRight(22, x);
        }

        function sigma1(x: number): number {
          return rotateRight(6, x) ^ rotateRight(11, x) ^ rotateRight(25, x);
        }

        function gamma0(x: number): number {
          return rotateRight(7, x) ^ rotateRight(18, x) ^ (x >>> 3);
        }

        function gamma1(x: number): number {
          return rotateRight(17, x) ^ rotateRight(19, x) ^ (x >>> 10);
        }

        const h0 = 0x6a09e667,
          h1 = 0xbb67ae85,
          h2 = 0x3c6ef372,
          h3 = 0xa54ff53a,
          h4 = 0x510e527f,
          h5 = 0x9b05688c,
          h6 = 0x1f83d9ab,
          h7 = 0x5be0cd19;

        const k = [
          0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4,
          0xab1c5ed5,
          // ...
        ];

        const dataBytes = data;
        const dataLength = dataBytes.length;
        const paddedLength = (((dataLength + 8) >> 6) << 6) + 64;
        const paddedBytes = new Uint8Array(paddedLength);
        paddedBytes.set(dataBytes);
        paddedBytes[dataLength] = 0x80;
        const lengthBits = dataLength * 8;
        paddedBytes.set(
          new Uint8Array([
            (lengthBits >>> 24) & 0xff,
            (lengthBits >>> 16) & 0xff,
            (lengthBits >>> 8) & 0xff,
            lengthBits & 0xff,
          ]),
          paddedLength - 4
        );

        let a = h0;
        let b = h1;
        let c = h2;
        let d = h3;
        let e = h4;
        let f = h5;
        let g = h6;
        let hh = h7;

        for (let i = 0; i < paddedLength / 64; i++) {
          const words = new Uint32Array(64);
          for (let j = 0; j < 16; j++) {
            words[j] =
              (paddedBytes[i * 64 + j * 4] << 24) |
              (paddedBytes[i * 64 + j * 4 + 1] << 16) |
              (paddedBytes[i * 64 + j * 4 + 2] << 8) |
              paddedBytes[i * 64 + j * 4 + 3];
          }
          for (let j = 16; j < 64; j++) {
            words[j] =
              (gamma1(words[j - 2]) + words[j - 7] + gamma0(words[j - 15]) + words[j - 16]) | 0;
          }

          let A = a;
          let B = b;
          let C = c;
          let D = d;
          let E = e;
          let F = f;
          let G = g;
          let H = hh;

          for (let j = 0; j < 64; j++) {
            const temp1 = (H + sigma1(E) + choice(E, F, G) + k[j] + words[j]) | 0;
            const temp2 = (sigma0(A) + majority(A, B, C)) | 0;
            H = G;
            G = F;
            F = E;
            E = (D + temp1) | 0;
            D = C;
            C = B;
            B = A;
            A = (temp1 + temp2) | 0;
          }

          a = (a + A) | 0;
          b = (b + B) | 0;
          c = (c + C) | 0;
          d = (d + D) | 0;
          e = (e + E) | 0;
          f = (f + F) | 0;
          g = (g + G) | 0;
          hh = (hh + H) | 0;
        }

        return uint8ArrayToHex(
          new Uint8Array([
            (a >>> 24) & 0xff,
            (a >>> 16) & 0xff,
            (a >>> 8) & 0xff,
            a & 0xff,
            (b >>> 24) & 0xff,
            (b >>> 16) & 0xff,
            (b >>> 8) & 0xff,
            b & 0xff,
            (c >>> 24) & 0xff,
            (c >>> 16) & 0xff,
            (c >>> 8) & 0xff,
            c & 0xff,
            (d >>> 24) & 0xff,
            (d >>> 16) & 0xff,
            (d >>> 8) & 0xff,
            d & 0xff,
            (e >>> 24) & 0xff,
            (e >>> 16) & 0xff,
            (e >>> 8) & 0xff,
            e & 0xff,
            (f >>> 24) & 0xff,
            (f >>> 16) & 0xff,
            (f >>> 8) & 0xff,
            f & 0xff,
            (g >>> 24) & 0xff,
            (g >>> 16) & 0xff,
            (g >>> 8) & 0xff,
            g & 0xff,
            (hh >>> 24) & 0xff,
            (hh >>> 16) & 0xff,
            (hh >>> 8) & 0xff,
            hh & 0xff,
          ])
        );
      },
      MD5: (data) => {
        // Implement MD5 algorithm here
        return anyToUint8Array(data).toString();
      },
    };

    // Calculate the hash
    const dataBytes = anyToUint8Array(data);
    return hashFunctions[algorithm](dataBytes);
  } catch (error) {
    console.error('Error calculating hash:', error);
    throw error;
  }
};

export default calculateHash;
