import { JWTType } from "./jwt-interface";

export class JWT {
    static parse <T extends JWTType>(token: string): { payload: T, expired?: boolean } {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const parsed: T = JSON.parse(jsonPayload);
        let expireDate: Date | undefined = parsed.exp ?
            new Date(parsed.exp * 1000) :
            undefined;
        
        let exp: boolean | undefined = expireDate ?
            expireDate < new Date() :
            undefined;
        
        return {
            payload: parsed,
            expired: exp
        };
    }
}