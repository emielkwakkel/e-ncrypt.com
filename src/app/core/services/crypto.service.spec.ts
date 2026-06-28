import { describe, expect, it } from 'vitest';
import {
  CryptoService,
  EncryptionAlgorithms,
  HashingAlgorithms,
} from './crypto.service';

describe('CryptoService', () => {
  const service = new CryptoService();
  const password = 'secret-key';
  const plaintext = 'Hello, e-ncrypt!';

  it('encrypts and decrypts with AES', () => {
    const encrypted = service.encrypt(
      plaintext,
      password,
      EncryptionAlgorithms.AES,
    );
    expect(encrypted).not.toBe(plaintext);

    const decrypted = service.decrypt(
      encrypted,
      password,
      EncryptionAlgorithms.AES,
    );
    expect(decrypted).toBe(plaintext);
  });

  it('encrypts and decrypts with TripleDES', () => {
    const encrypted = service.encrypt(
      plaintext,
      password,
      EncryptionAlgorithms.TripleDES,
    );
    const decrypted = service.decrypt(
      encrypted,
      password,
      EncryptionAlgorithms.TripleDES,
    );
    expect(decrypted).toBe(plaintext);
  });

  it('encrypts and decrypts with Rabbit', () => {
    const encrypted = service.encrypt(
      plaintext,
      password,
      EncryptionAlgorithms.Rabbit,
    );
    const decrypted = service.decrypt(
      encrypted,
      password,
      EncryptionAlgorithms.Rabbit,
    );
    expect(decrypted).toBe(plaintext);
  });

  it('applies multiple encryption rounds', () => {
    const once = service.encrypt(
      plaintext,
      password,
      EncryptionAlgorithms.AES,
      1,
    );
    const thrice = service.encrypt(
      plaintext,
      password,
      EncryptionAlgorithms.AES,
      3,
    );
    expect(once).not.toBe(thrice);

    const decrypted = service.decrypt(
      thrice,
      password,
      EncryptionAlgorithms.AES,
      3,
    );
    expect(decrypted).toBe(plaintext);
  });

  it('hashes content with SHA512', () => {
    const hashed = service.hash(plaintext, HashingAlgorithms.SHA512);
    expect(hashed).toHaveLength(128);
    expect(hashed).toMatch(/^[a-f0-9]+$/i);
  });

  it('applies multiple hashing rounds', () => {
    const once = service.hash(plaintext, HashingAlgorithms.SHA256, 1);
    const twice = service.hash(plaintext, HashingAlgorithms.SHA256, 2);
    expect(once).not.toBe(twice);
  });
});
