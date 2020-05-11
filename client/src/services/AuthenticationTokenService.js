import HttpHelper from "../helpers/HttpHelper";

export default class AuthenticationTokenService {
    constructor() {
        this._serverURL = `${SERVICE_URL}/auth`;
        this._webtoken = 'msaloonwbtoken';

        this._http = new HttpHelper();
    }

    hasValidToken() {
        return this._http.get(this._serverURL);
    }

    authenticate(authDTO) {
        let transactionDetails = {
            'method': 'POST',
            'body': JSON.stringify(authDTO),
            'headers': {
                'Content-type': 'Application/json'
            }
        }

        return fetch(this._serverURL, transactionDetails)
            .then(res => {
                if (res.ok && res.status == 200) {
                    return res.json();
                }
                throw new Error("The signin data is not correct");
            }).then(data => {
                this._http.addToken(data.type, data.token);
            });
    }

    logout() {
        this._http.cleanToken();
    }

    redirectToLoginPage() {
        window.location.href = '/login.html'
    }  

}