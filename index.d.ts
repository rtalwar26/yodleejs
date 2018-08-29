declare namespace YodleeSchema {
    export interface CobrandSession {
        cobrandId: number,
        applicationId: string,
        locale: string,
        session: {
            cobSession: string
        }
    }
    export interface CobrandConfig {
        name: string,

    }
    export interface UserRegistration {

        user: {
            loginName: string,
            password: string,
            email: string,
            name?: {
                first: string,
                last: string
            },
            address?: {
                address1: string, // "200 Lincoln Ave"
                state: string, // "CA"
                city: string, // "Salinas"
                zip: string, // "93901"
                country: string, // "US"
            },
            preferences?: {
                currency: string, // "USD"
                timeZone: string, // "PST"
                dateFormat: string, //"MM/dd/yyyy"
                locale: string, //"en_US"
            }
        }

    }

    export interface UserAccessTokenResponse {
        user: {
            accessTokens: [
                {
                    appId: string,
                    value: string,
                    url: string
                }
            ]
        }
    }
    export interface UserLoginResponse {
        user: {
            id: string,
            loginName: string,
            roleType: string,
            session: {
                userSession: string
            },
            name: {
                first: string,
                last: string
            },
            preferences: {
                currency: string,
                timeZone: string,
                dateFormat: string,
                locale: string
            }
        }
    }

}

