export default class AuthToken {
    constructor(user, type, token, expiration) {
        this._user = user;
        this._type = type;
        this._token = token;
        this._expiration = new Date(expiration);
    }

    static buildFromFullToken(user, fulltoken, expiration) {
        let splitted = fulltoken.split(" ");

        return new AuthToken(user, splitted[0], splitted[1], expiration);
    }

    isExpired() {
        return this._expiration < new Date();
    }

    get fullToken() {
        return this._type + " " + this._token;
    }

    get token() {
        return this._token;
    }

    get type() {
        return this._type;
    }

    get expiration() {
        return this._expiration;
    }

    get user() {
        return this._user;
    }

}