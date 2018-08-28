
/// <reference path="../index.d.ts" />

import Axios, * as axios from "axios"

const apiVersion = '1.1'
export default class Yodlee {
    private _net: axios.AxiosInstance
    private _cobrandConfig: YodleeSchema.CobrandConfig
    
    setCobrandConfig(config: YodleeSchema.CobrandConfig) {
        this._cobrandConfig = config;
    }

    private defaultHeaders(isDev: boolean = false): Object {
        return {
            'Cobrand-Name': this._cobrandConfig.name,
            'Api-Version': `${apiVersion}`
        }
    }
    constructor() {

        this._net = Axios.create({
            baseURL: 'https://developer.api.yodlee.com/ysl',
            timeout: 1000,
            headers: {
                ...this.defaultHeaders()
            }
        })

    }

    async registerUser(payload: YodleeSchema.UserRegistration): Promise<YodleeSchema.UserLoginResponse> {
        let resp = await this._net.post('/user/register', payload);
        return resp.data;
    }

    async cobrandLoginSession(login: string, password: string, locale?: string): Promise<YodleeSchema.CobrandSession> {
        let resp = await this._net.post('/cobrand/login', {

            "cobrand": {
                "cobrandLogin": login,
                "cobrandPassword": password,
                "locale": locale || "en_US"
            }

        });
        return resp.data;
    }
    async userLogin(loginName: string, password: string, cobrandToken: string, locale?: string): Promise<YodleeSchema.UserLoginResponse> {
        let resp = await this._net.post('/user/login', {

            "user": {
                "loginName": loginName,
                "password": password,
                "locale": locale || "en_US"
            }

        }, {
                headers: {
                    ... this.defaultHeaders(),
                    Authorization: `{cobSession=${cobrandToken}}`
                }
            });
        return resp.data;
    }

    async userAccessTokens(appIds:string[],cobrandToken: string,userToken:string): Promise<YodleeSchema.UserAccessTokenResponse> {
        let resp = await this._net.post(`/user/accessTokens?appIds=${appIds.join(",")}`, {
                headers: {
                    ... this.defaultHeaders(),
                    Authorization: `{cobSession=${cobrandToken},userSession=${userToken}}`
                }
            });
        return resp.data;
    }
}