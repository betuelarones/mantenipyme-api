import { randomBytes } from 'node:crypto';
export const jwtSecret = process.env.JWT_SECRET?.trim() || randomBytes(32).toString('base64url');
//# sourceMappingURL=jwt-secret.js.map