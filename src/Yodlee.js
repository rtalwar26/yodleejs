"use strict";
/// <reference path="../index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const apiVersion = '1.1';
class Yodlee {
    constructor(cobrandName) {
        this._cobrandConfig = { name: "" };
        this.setCobrandName(cobrandName);
        this._net = axios_1.default.create({
            baseURL: 'https://developer.api.yodlee.com/ysl',
            timeout: 1000,
            headers: Object.assign({}, this.defaultHeaders())
        });
    }
    setCobrandName(name) {
        this._cobrandConfig.name = name;
    }
    defaultHeaders(isDev = false) {
        return {
            'Cobrand-Name': this._cobrandConfig.name,
            'Api-Version': `${apiVersion}`
        };
    }
    async registerUser(payload) {
        let resp = await this._net.post('/user/register', payload);
        return resp.data;
    }
    async cobrandLoginSession(login, password, locale) {
        let resp = await this._net.post('/cobrand/login', {
            "cobrand": {
                "cobrandLogin": login,
                "cobrandPassword": password,
                "locale": locale || "en_US"
            }
        });
        return resp.data;
    }
    async userLogin(loginName, password, cobrandToken, locale) {
        let resp = await this._net.post('/user/login', {
            "user": {
                "loginName": loginName,
                "password": password,
                "locale": locale || "en_US"
            }
        }, {
            headers: Object.assign({}, this.defaultHeaders(), { Authorization: `{cobSession=${cobrandToken}}` })
        });
        return resp.data;
    }
    async userAccessTokens(appIds, cobrandToken, userToken) {
        let resp = await this._net.post(`/user/accessTokens?appIds=${appIds.join(",")}`, {
            headers: Object.assign({}, this.defaultHeaders(), { Authorization: `{cobSession=${cobrandToken},userSession=${userToken}}` })
        });
        return resp.data;
    }
}
exports.default = Yodlee;
