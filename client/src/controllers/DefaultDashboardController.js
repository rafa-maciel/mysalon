import AuthenticationTokenService from '../services/AuthenticationTokenService';
import PreLoader from '../components/PreLoader';
import '../../dist/css/style.css';


export default class DefaultDashboardController {
    constructor() {
        this._preLoader = new PreLoader();
        
        this._authService = new AuthenticationTokenService();
        this._validAuthenticatedClient();

        document.querySelector(".app-sign-out").addEventListener("click", () => {
            console.log("doing logoff");
            this.doLogoff()
        });
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
        if (!this._authService.hasValidToken()) 
            this._authService.redirectToLoginPage();
    }
}