import AuthenticationTokenService from '../services/AuthenticationTokenService';
import PreLoader from '../components/PreLoader';
import '../../dist/css/style.css';


export default class DefaultDashboardController {
    constructor() {
        this._preLoader = new PreLoader();
        
        this._authService = new AuthenticationTokenService();
        this._validAuthenticatedClient();

        document.querySelector(".app-sign-out").addEventListener("click", () => {this.doLogoff()});
        this._init();
    }

    doLogoff() {
        this._authService.logout();
        this._authService.redirectToLoginPage();
    }

    _getProfessionalLoggedEmail() {
        return this._authService.getProfessionalLoggedEmail();
    }

    _init() {
        throw new Error('the _init() method must be implemented');
    }

    _validAuthenticatedClient() {
        this._authService.hasValidToken()
            .catch(() => {this._authService.redirectToLoginPage()});
    }
}