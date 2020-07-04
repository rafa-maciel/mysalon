import AuthenticationTokenService from "../services/AuthenticationTokenService";
import AuthenticationForm from "../views/AuthenticationForm";
import ListenerAction from "../components/ListenerAction";
import HttpHelper from "../helpers/HttpHelper";
import LoginPageLayout from "../components/LoginPageLayout";
import LogoutPageLayout from "../components/LogoutPageLayout";

export default class AuthenticationController {
    constructor(parentNode=null) {
        this._authService = new AuthenticationTokenService();
        this._parentNode = parentNode;

        this._initPage();
       
    }

    _initPage() {
        if (this._authService.hasValidToken()) {
            this._initLogoutPage();
        } else {
            this._initLoginPage();
        }
    }

    _initLogoutPage() {
        this._parentNode.innerHTML = "";
        this._page = new LogoutPageLayout(this._parentNode, new ListenerAction('submit', event => {
            event.preventDefault();
            this.logout();
        }));
    }

    _initLoginPage() {
        this._parentNode.innerHTML = "";
        this._page = new LoginPageLayout(this._parentNode);
        this._form = new AuthenticationForm(this._page.loginNode, 
        new ListenerAction('submit', event => {
            event.preventDefault();
            this.sigin();
        }));
    }

    _redirectAuthenticateds() {
        if (this._authService.hasValidToken()) {
            window.location.reload();
        }
    }

    sigin() {
        let dto = this._form.getAuthenticationDTO();
        
        this._authService.authenticate(dto)
            .then(() => {
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
                this._form.invalidFormData();
            });
    }

    logout() {
        this._authService.logout();
        this._initLoginPage();
    }
}