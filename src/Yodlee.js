"use strict";
/// <reference path="../index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
class Yodlee {
    setCobrandConfig(config) {
        this._cobrandConfig = config;
    }
    defaultHeaders(isDev = false) {
        return {
            'Cobrand-Name': this._cobrandConfig.name,
            'Api-Version': '1.1'
        };
    }
    constructor() {
        this._net = axios_1.default.create({
            baseURL: 'https://some-domain.com/api/',
            timeout: 1000,
            headers: Object.assign({}, this.defaultHeaders())
        });
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
    async userLogin(loginName, password, locale) {
        let resp = await this._net.post('/cobrand/login', {
            "user": {
                "loginName": loginName,
                "password": password,
                "locale": locale || "en_US"
            }
        });
        return resp.data;
    }
}
exports.default = Yodlee;
