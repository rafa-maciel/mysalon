import DashboardNavigation from '../components/DashboardNavigation';
import HeaderNavigation from '../components/HeaderNavigation';
import ListenerAction from '../components/ListenerAction';
import AuthenticationTokenService from '../services/AuthenticationTokenService';
import PreLoader from '../components/PreLoader';


export default class DefaultDashboardController {
    constructor() {
        this._preLoader = new PreLoader();
        
        this._authService = new AuthenticationTokenService();
        this._validAuthenticatedClient();

        this._headerNav = new HeaderNavigation('#headerNavigation', new ListenerAction('click', event => {
            this.doLogoff();
        }));        

        this._dashboardNav = new DashboardNavigation('#dashboardNavigation');

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