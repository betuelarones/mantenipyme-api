import { Strategy } from 'passport-jwt';
import { Rol } from '../common/enums/rol.enum.js';
import { AuthenticatedUser } from '../common/interfaces/authenticated-user.interface.js';
interface JwtPayload {
    sub: string;
    role: Rol;
}
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: JwtPayload): AuthenticatedUser;
}
export {};
