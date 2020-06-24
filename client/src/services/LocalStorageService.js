import AuthToken from "../models/AuthToken";

export default class LocalStorageService {
    constructor() {
        this._storage = window.localStorage;
        this._tokenKey = "msaloonwbtoken";
        this._tokenExpirationKey = "msaloonwbtokenexpiration";
        this._tokenUserKey = "msaloonwbtokenuser";
    }

    storeAuthToken(authToken) {
        this._storage.setItem(this._tokenKey, authToken.fullToken);
        this._storage.setItem(this._tokenExpirationKey, authToken.expiration);
        this._storage.setItem(this._tokenUserKey, authToken.user);
    }

    cleanAuthToken() {
        this._storage.removeItem(this._tokenKey);
        this._storage.removeItem(this._tokenExpirationKey);
        this._storage.removeItem(this._tokenUserKey);
    }
    
    get authToken() {
        let fulltoken = this._storage.getItem(this._tokenKey);
        let expiration = this._storage.getItem(this._tokenExpirationKey);
        let user = this._storage.getItem(this._tokenUserKey);
        
        if (fulltoken == null || expiration == null || user == null) return null;

        let auth = AuthToken.buildFromFullToken(user, fulltoken, expiration);
 
        return auth;
    }

    hasAuthenticatedToken() {
        let tk = this.authToken;
        return tk != null && tk != undefined;
    }



}