import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';

const ivKey =
  '6673236444466877242372777172656d6e266278753369795e6632333471772c2e';

export type EncryptionAlgorithmOptions = 'AES' | 'TripleDES' | 'Rabbit';

export enum EncryptionAlgorithms {
  AES = 'AES',
  TripleDES = 'TripleDES',
  Rabbit = 'Rabbit',
}

export type HashingAlgorithmOptions =
  | 'MD5'
  | 'SHA1'
  | 'SHA256'
  | 'SHA512'
  | 'SHA3'
  | 'RIPEMD160';

export enum HashingAlgorithms {
  MD5 = 'MD5',
  SHA1 = 'SHA1',
  SHA256 = 'SHA256',
  SHA512 = 'SHA512',
  SHA3 = 'SHA3',
  RIPEMD160 = 'RIPEMD160',
}

@Injectable({ providedIn: 'root' })
export class CryptoService {
  encrypt(
    content: string,
    secretKey: string,
    algorithm: EncryptionAlgorithmOptions = EncryptionAlgorithms.AES,
    encryptionRounds = 1,
    iv = CryptoJS.enc.Hex.parse(ivKey),
  ): string {
    Array.from(Array(encryptionRounds)).forEach(() => {
      content = CryptoJS[algorithm]
        .encrypt(content, secretKey, { iv })
        .toString();
    });

    return content;
  }

  decrypt(
    content: string,
    secretKey: string,
    algorithm: EncryptionAlgorithmOptions = EncryptionAlgorithms.AES,
    encryptionRounds = 1,
    iv = CryptoJS.enc.Hex.parse(ivKey),
  ): string {
    Array.from(Array(encryptionRounds)).forEach(() => {
      content = CryptoJS[algorithm]
        .decrypt(content, secretKey, { iv })
        .toString(CryptoJS.enc.Utf8);
    });

    return content;
  }

  hash(
    content: string,
    algorithm: HashingAlgorithmOptions = HashingAlgorithms.SHA512,
    hashingRounds = 1,
  ): string {
    Array.from(Array(hashingRounds)).forEach(() => {
      content = CryptoJS[algorithm](content).toString();
    });

    return content;
  }
}
