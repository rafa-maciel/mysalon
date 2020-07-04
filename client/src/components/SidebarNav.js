import Component from "./Component";
import DOMParserUtil from "../helpers/DOMParserUtil";
import jquery from 'jquery';

export default class SidebarNav extends Component{
    constructor(parentSelector) {
        super(parentSelector);
    }

    _init() {
        super._init();
        this._initSidebarToogleButton();
        this._initActiveNavItemsOnClick();
    }

    addItemListenerAction(item, listenerAction) {
        let el = this._component.querySelector(".nav-item."+item);
        el.addEventListener(listenerAction.type, listenerAction.action);
    }


    _initSidebarToogleButton() {
        this._component.querySelector("#sidebarToggle").addEventListener('click', e => {
            document.querySelector("body").classList.toggle("sidebar-toggled");
            
            let sidebarEl = document.querySelector(".sidebar");
            
            sidebarEl.classList.toggle("toggled");
            if (sidebarEl.classList.contains("toggled")) {
                jquery('.sidebar .collapse').collapse('hide');
            };
        });
    }

    _initActiveNavItemsOnClick() {
        let itemsEl = this._component.querySelectorAll(".navbar-links .nav-item");
        itemsEl.forEach(el => {el.addEventListener("click", () => {
            this._cleanActiveNavitems();
            el.classList.add('active');
        })});
    }
    

    _cleanActiveNavitems() {
        let itemsEl = this._component.querySelectorAll(".navbar-links .nav-item");
        itemsEl.forEach(el => {el.classList.remove('active')});
    }


    _base(info) {
        return `
            <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                <!-- Sidebar - Brand -->
                <a class="sidebar-brand d-flex align-items-center justify-content-center home-link" href="#">
                    <div class="sidebar-brand-icon rotate-n-15">
                        <i class="fas fa-laugh-wink"></i>
                    </div>
                    <div class="sidebar-brand-text mx-3">MySaloon</div>
                </a>
        
                <!-- Divider -->
                <hr class="sidebar-divider my-0">

                <div class="navbar-links">
                    <li class="nav-item professionals">
                        <a class="nav-link">
                        <i class="fa-fw fas fa-user-tie"></i>
                        <span>Profissionais</span></a>
                    </li>

                    <li class="nav-item customers">
                        <a class="nav-link">
                        <i class="fa-fw fas fa-users"></i>
                        <span>Clientes</span></a>
                    </li>

                    <li class="nav-item appointments">
                        <a class="nav-link">
                        <i class="fa-fw fas fa-calendar-check"></i>
                        <span>Atendimentos</span></a>
                    </li>

                    <li class="nav-item vendors">
                        <a class="nav-link">
                        <i class="fa-fw fas fa-hands-helping"></i>
                        <span>Fornecedores</span></a>
                    </li>

                    <li class="nav-item purchases">
                        <a class="nav-link">
                        <i class="fa-fw fas fa-shopping-basket"></i>
                        <span>Compras</span></a>
                    </li>

                    <li class="nav-item calendar">
                        <a class="nav-link">
                        <i class="fa-fw fas fa-calendar-alt"></i>
                        <span>Agenda</span></a>
                    </li>

                    <!-- Divider -->
                    <hr class="sidebar-divider">
    
                    <!-- Heading -->
                    <div class="sidebar-heading">
                        Perfil de usuário
                    </div>
    
                    <!-- Nav Item - Meu Perfil -->
                    <li class="nav-item profile">
                        <a class="nav-link">
                        <i class="fas fa-fw fa-id-card"></i>
                        <span>Perfil</span></a>
                    </li>
                    <li class="nav-item app-sign-out">
                        <a class="nav-link">
                        <i class="fas fa-fw fa-sign-out-alt"></i>
                        <span>Deslogar</span></a>
                    </li>
    
                    <!-- Divider -->
                    <hr class="sidebar-divider d-none d-md-block">
                </div>

                <!-- Sidebar Toggler (Sidebar) -->
                <div class="text-center d-none d-md-inline">
                    <button class="rounded-circle border-0" id="sidebarToggle"></button>
                </div>

                
            </ul>
        `;
    }

}