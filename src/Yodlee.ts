
/// <reference path="../index.d.ts" />

import Axios, * as axios from "axios"

export default class Yodlee {
    net:axios.AxiosInstance
    private _cobrandConfig:Yodlee.CobrandConfig

    setCobrandConfig(config:Yodlee.CobrandConfig){
        this._cobrandConfig = config;
    }
    
    private defaultHeaders(isDev:boolean = false):Object{
        return {
            'Cobrand-Name': this._cobrandConfig.name,
            'Api-Version': '1.1'            
        }
    }
    constructor(){
        
        this.net = Axios.create({
            baseURL: 'https://some-domain.com/api/',
            timeout: 1000,
            headers: {
                ...this.defaultHeaders()
            }
        })

    }

    async registerUser(payload:Yodlee.UserRegistration):Promise<Yodlee.UserLoginResponse>{
        let resp = await this.net.post('/user/register',payload);
        return resp.data;
    }

    async cobrandLoginSession(login:String,password:string,locale?:string):Promise<Yodlee.CobrandSession>{
        let resp = await this.net.post('/cobrand/login',{
            
                "cobrand":      {
                  "cobrandLogin": login,
                  "cobrandPassword": password,
                  "locale": locale || "en_US"
                 }
               
        });
        return resp.data;
    }
    async userLogin(loginName:string,password:string,locale?:string):Promise<Yodlee.UserLoginResponse>{
        let resp = await this.net.post('/cobrand/login',{
            
            "user":      {
                "loginName": loginName,
                "password": password,
                "locale": locale || "en_US"
               }
           
    });
    return resp.data;
    }
}