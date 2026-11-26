import { randomBytes } from 'node:crypto';

export const jwtSecret =
  process.env.JWT_SECRET ?? randomBytes(32).toString('base64url');
