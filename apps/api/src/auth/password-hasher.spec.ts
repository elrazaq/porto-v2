import { describe, expect, it } from 'vitest';
import { hashPassword, verifyPassword } from './password-hasher.js';

describe('password hashing', () => {
  it('accepts the original password and rejects another', async () => {
    const hash = await hashPassword('test-password-only');
    expect(hash).not.toBe('test-password-only');
    await expect(verifyPassword('test-password-only', hash)).resolves.toBe(true);
    await expect(verifyPassword('wrong-password', hash)).resolves.toBe(false);
  });
});