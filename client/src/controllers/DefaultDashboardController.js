import AuthenticationTokenService from '../services/AuthenticationTokenService';
import PreLoader from '../components/PreLoader';
import '../../dist/css/style.css';


export default class DefaultDashboardController {
    constructor() {
        this._preLoader = new PreLoader();
        
        this._authService = new AuthenticationTokenService();
        this._validAuthenticatedClient();
        this._init();
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