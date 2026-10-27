import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';

const N = 1 << 15;
const R = 8;
const P = 1;
const SALT_BYTES = 16;
const KEY_BYTES = 64;
const MAXMEM = 64 * 1024 * 1024;

function derive(password: string, salt: Buffer): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scryptCallback(password, salt, KEY_BYTES, { N, r: R, p: P, maxmem: MAXMEM }, (error, key) => {
      if (error) reject(error);
      else resolve(key);
    });
  });
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(SALT_BYTES);
  const key = await derive(password, salt);
  return `scrypt-v1$${N}$${R}$${P}$${salt.toString('base64url')}$${key.toString('base64url')}`;
}

export async function verifyPassword(password: string, encoded: string): Promise<boolean> {
  const [version, n, r, p, saltText, keyText, ...extra] = encoded.split('$');
  if (
    version !== 'scrypt-v1' ||
    Number(n) !== N ||
    Number(r) !== R ||
    Number(p) !== P ||
    !saltText ||
    !keyText ||
    extra.length > 0
  ) return false;

  const salt = Buffer.from(saltText, 'base64url');
  const expected = Buffer.from(keyText, 'base64url');
  if (salt.length !== SALT_BYTES || expected.length !== KEY_BYTES) return false;

  return timingSafeEqual(await derive(password, salt), expected);
}
