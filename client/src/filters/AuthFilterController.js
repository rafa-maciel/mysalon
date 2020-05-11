import AuthenticationTokenService from "../services/AuthenticationTokenService";

export default class AuthFilterController {
    constructor() {
        this._authService = new AuthenticationTokenService();
        this._authService.hasValidToken()
            .catch(() => {this._authService.redirectToLoginPage()});
            
        document.querySelector('a.logout').addEventListener('click', event => {
            event.preventDefault();
            this._authService.logout();
            this._authService.redirectToLoginPage();
        });
    }
}