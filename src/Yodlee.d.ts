/// <reference path="../index.d.ts" />
export default class Yodlee {
    private _net;
    private _cobrandConfig;
    setCobrandConfig(config: Yodlee.CobrandConfig): void;
    private defaultHeaders(isDev?);
    constructor();
    registerUser(payload: Yodlee.UserRegistration): Promise<Yodlee.UserLoginResponse>;
    cobrandLoginSession(login: string, password: string, locale?: string): Promise<Yodlee.CobrandSession>;
    userLogin(loginName: string, password: string, cobrandToken: string, locale?: string): Promise<Yodlee.UserLoginResponse>;
    userAccessTokens(appIds: string[], cobrandToken: string, userToken: string): Promise<Yodlee.UserAccessTokenResponse>;
}
