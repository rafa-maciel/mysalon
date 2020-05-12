import Component from "./Component";

export default class HeaderNavigation extends Component {
    constructor(parentSelector, logoffAction) {
        super(parentSelector);

        this._initHeaderNavigation(logoffAction);
    }

    _initHeaderNavigation(logoffAction) {
        this._component.querySelector('a.logout').addEventListener(logoffAction.type, logoffAction.action);
    }

    _base(info) {
        return `
        <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
            <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">My Saloon Web</a>
            <input class="form-control form-control-dark w-100" type="text" placeholder="Pesquisar" aria-label="Pesquisar">
            <ul class="navbar-nav px-3">
                <li class="nav-item text-nowrap">
                <a class="nav-link logout" href="#">Logoff</a>
                </li>
            </ul>
        </nav>
        `
    }

}