import HttpHelper from "../helpers/HttpHelper";
import LocalStorageService from "./LocalStorageService";
import AuthToken from "../models/AuthToken";

export default class AuthenticationTokenService {
    constructor() {
        this._authEndpoint = `${SERVICE_URL}/auth`;
        this._localStoregeService = new LocalStorageService();
    }

    hasValidToken() {
        if (this._localStoregeService.hasAuthenticatedToken()) {
            let authToken = this._localStoregeService.authToken;
            return authToken.isExpired() == false;
        }

        return false;
    }

    getProfessionalLoggedEmail() {
        return this._localStoregeService.authToken.user;
    }

    authenticate(authDTO) {
        let transactionDetails = {
            'method': 'POST',
            'body': JSON.stringify(authDTO),
            'headers': {
                'Content-type': 'Application/json'
            }
        }

        return fetch(this._authEndpoint, transactionDetails)
            .then(res => {
                if (res.ok && res.status == 200) {
                    return res.json();
                }
                throw new Error("The signin data is not correct");
            }).then(data => {
                let authToken = new AuthToken(authDTO.email, data.type, data.token, data.expiration);
                this._localStoregeService.storeAuthToken(authToken);
            });
    }

    logout() {
        this._localStoregeService.cleanAuthToken();
    }

    redirectToLoginPage() {
        window.location.href = '/login.html'
    }  
}