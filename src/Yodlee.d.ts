/// <reference path="../index.d.ts" />
export default class Yodlee {
    private _net;
    private _cobrandConfig;
    setCobrandName(name: string): void;
    private defaultHeaders;
    constructor(cobrandName: string);
    registerUser(payload: YodleeSchema.UserRegistration): Promise<YodleeSchema.UserLoginResponse>;
    cobrandLoginSession(login: string, password: string, locale?: string): Promise<YodleeSchema.CobrandSession>;
    userLogin(loginName: string, password: string, cobrandToken: string, locale?: string): Promise<YodleeSchema.UserLoginResponse>;
    userAccessTokens(appIds: string[], cobrandToken: string, userToken: string): Promise<YodleeSchema.UserAccessTokenResponse>;
}
