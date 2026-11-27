import { randomBytes, scrypt as callbackScrypt, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
const scrypt = promisify(callbackScrypt);
const keyLength = 64;
export async function hashPassword(password) {
    const salt = randomBytes(16).toString('hex');
    const key = (await scrypt(password, salt, keyLength));
    return `${salt}:${key.toString('hex')}`;
}
export async function verifyPassword(password, storedHash) {
    const [salt, hash] = storedHash.split(':');
    if (!salt || !hash)
        return false;
    const expected = Buffer.from(hash, 'hex');
    const actual = (await scrypt(password, salt, keyLength));
    return expected.length === actual.length && timingSafeEqual(expected, actual);
}
//# sourceMappingURL=password.js.map