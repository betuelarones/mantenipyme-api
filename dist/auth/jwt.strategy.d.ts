import { Strategy } from 'passport-jwt';
import { AuthenticatedUser } from '../common/interfaces/authenticated-user.interface.js';
import { PrismaService } from '../prisma/prisma.service.js';
interface JwtPayload {
    sub: string;
}
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly prisma;
    constructor(prisma: PrismaService);
    validate(payload: JwtPayload): Promise<AuthenticatedUser>;
}
export {};
