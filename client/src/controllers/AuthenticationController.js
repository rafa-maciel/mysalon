import AuthenticationTokenService from "../services/AuthenticationTokenService";
import AuthenticationForm from "../views/AuthenticationForm";
import ListenerAction from "../components/ListenerAction";
import HttpHelper from "../helpers/HttpHelper";

export default class AuthenticationController {
    constructor() {
        this._authService = new AuthenticationTokenService();
        this._redirectAuthenticateds();
        
        this._form = new AuthenticationForm('.authenticationForm', 
            new ListenerAction('submit', event => {
                event.preventDefault();
                this.sigin();
            }));
    }

    _redirectAuthenticateds() {
        if (this._authService.hasValidToken()) {
            window.location.href = '/app.html'
        }
    }

    sigin() {
        let dto = this._form.getAuthenticationDTO();
        
        this._authService.authenticate(dto)
            .then(() => {
                window.location.href = '/app.html';
            })
            .catch(err => {
                console.log(err);
                this._form.invalidFormData();
            });
    }
}