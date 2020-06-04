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
        this._authService.hasValidToken()
            .then(() => {window.location.href = '/customers.html'})
            .catch(error => {});
    }

    sigin() {
        let dto = this._form.getAuthenticationDTO();
        let http = new HttpHelper();
        this._authService.authenticate(dto)
            .then(() => {
                window.location.href = '/customers.html';
                http.storeItem('email', dto.email);
            })
            .catch(() => {
                this._form.invalidFormData();
            });
    }
}