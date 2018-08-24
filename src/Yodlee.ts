
/// <reference path="../index.d.ts" />

import Axios, * as axios from "axios"

export default class Yodlee {
    private _net:axios.AxiosInstance
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
        
        this._net = Axios.create({
            baseURL: 'https://developer.api.yodlee.com/ysl',
            timeout: 1000,
            headers: {
                ...this.defaultHeaders()
            }
        })

    }

    async registerUser(payload:Yodlee.UserRegistration):Promise<Yodlee.UserLoginResponse>{
        let resp = await this._net.post('/user/register',payload);
        return resp.data;
    }

    async cobrandLoginSession(login:String,password:string,locale?:string):Promise<Yodlee.CobrandSession>{
        let resp = await this._net.post('/cobrand/login',{
            
                "cobrand":      {
                  "cobrandLogin": login,
                  "cobrandPassword": password,
                  "locale": locale || "en_US"
                 }
               
        });
        return resp.data;
    }
    async userLogin(loginName:string,password:string,cobrandToken:string,locale?:string):Promise<Yodlee.UserLoginResponse>{
        let resp = await this._net.post('/user/login',{
            
            "user":      {
                "loginName": loginName,
                "password": password,
                "locale": locale || "en_US"
               }
           
    },{
        headers:{
            ... this.defaultHeaders(),
            Authorization:`{cobSession=${cobrandToken}`
        }
    });
    return resp.data;
    }
}