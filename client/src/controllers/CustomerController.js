import ProxyModelView from "../helpers/BindProxyModelView";
import ModelList from "../models/ModelList";
import CustomerService from "../services/CustomerService";
import AlertMessage from "../models/AlertMessage";
import AlertMessageView from "../views/AlertMessageView";
import CustomerFilterForm from "../views/CustomerFilterForm";
import Modal from "../components/Modal";
import CustomerForm from "../views/CustomerForm";
import Customer from "../models/Customer";
import Button from "../components/Button";
import ListenerAction from "../components/ListenerAction";
import CustomersTable from "../views/CustomersTable";
import ProxyModelComponent from "../helpers/ProxyModelComponent";
import ConfirmModal from "../components/ConfirmModal";
import PageableNavigation from "../components/PageableNavigation";
import DefaultDashboardController from "./DefaultDashboardController";

export default class CustomerController extends DefaultDashboardController {

    _init() {
        this._service = new CustomerService();
        this._buttonsMenuEl = document.querySelector(".buttons-menu-bar");
        this._contentEl = document.querySelector(".main-content");

        this._initTopNavButtons();
        this._initAlertMessages();
        this._initRemoveConfirmationModal();
        this._initCustomerFormModal();
        this._initCustomersTable();
        this.searchCustomers();
        this._initModalFormButtons();
    }

    saveCustomerForm() {
        let dto = this._customerForm.getCustomerDTO();
        let savePromisse = dto.id ? this._service.updateCustomer(dto) : this._service.createCustomer(dto);

        this._preLoader.run(
            savePromisse.then(customer => {
                this._customers.add(customer);
                this._message.update(`Os dados do ${customer.fullname} foram salvos com sucesso`,
                    `Dados Salvo`, 
                    'success');

                    this._modalForm.hide();
            }).catch(error => console.log(error))
        );
    }

    deleteCustomer(id) {
        this._preLoader.run(
            this._service.deleteCustomer(id)
                .then(() => {
                    this._customers.remove(id);
                    this._message.update('Os dados do cliente foram removidos definitivamente',
                    'Cliente removido!', 'info');
                
                }).catch(error => {
                    this._message.update(error.message,
                        'Erro na operação!', 'warning');
                })
        );

        this._modalConfirmRemove.hide();
    }

    searchCustomers(page=null) {
        this._customers.clean();

        let parameters = this._filter.getDataAsParams();
        if (page != null) parameters = parameters + '&page=' + page;
        this._preLoader.run(
            this._service.getCustomers(parameters)
                .then(pageable => {
                    this._pageable.update(pageable);
                    pageable.content.forEach(customer => {
                        this._customers.add(customer);
                    });
                    this._message.update('',
                        'Lista de Clientes atualizada!', 
                        'info');
                })
                .catch(error => {
                    this._message.update(error.message,
                        'A conexão falhou',
                        'info');
                })
        )
    }

    _initCustomersTable() {
        this._customers = new ProxyModelComponent(new ModelList(), 
            new CustomersTable(this._contentEl, 
                id => {this._editCustomer(id)}, 
                id => {this._confirmRemoveCustomer(id)}),
            'add', 'remove', 'clean');

        this._modalSearchForm = new Modal(this._contentEl, {
            'id': 'modalSearchForm',
            'title': 'Filtro de pesquisa'
        });

        this._filter = new CustomerFilterForm(this._modalSearchForm.contentSelector, 
            new ListenerAction('submit', event => {
            event.preventDefault();
            this.searchCustomers()
            this._modalSearchForm.hide();
        }));


        this._pageable = new PageableNavigation(this._contentEl, {
            'id': 'customerListPagination', 
        }, page => {this.searchCustomers(page)});
    }

    _initCustomerFormModal() {
        this._modalForm = new Modal(this._contentEl, {
            'id': 'mForm',
            'title': 'Formulário do Cliente',
            'footer': true
        });

        this._customerForm = new CustomerForm(this._modalForm.contentSelector);
    }

    _initRemoveConfirmationModal() {
        this._modalConfirmRemove = new ConfirmModal(this._contentEl, {
            "id": "modalConfirmRemove",
            "title": "Remover Cliente", 
            "buttonLabel": "Remover definitivamente"
        }, id => {this.deleteCustomer(id)});
    }

    _initAlertMessages() {
        let messageEl = document.createElement("div");
        this._contentEl.appendChild(messageEl);

        this._message = new ProxyModelView(new AlertMessage(),
            new AlertMessageView(messageEl), 
            'update');
    }

    _initTopNavButtons() {
        let elCreate = new Button("Cadastrar Cliente", "btn btn-primary ", "button", 
            new ListenerAction("click", () => {this._createCustomer()}));

        let elFilter = new Button("Filtrar Pesquisa", "btn btn-secondary ", "button", 
            new ListenerAction("click", () => {this._modalSearchForm.show()}));

        this._buttonsMenuEl.appendChild(elCreate);
        this._buttonsMenuEl.appendChild(elFilter);
    }

    _initModalFormButtons() {
        this._modalForm.updateFooter(
            new Button('Salvar', 'btn btn-primary btn-lg', 'button', 
                new ListenerAction('click', () => {this.saveCustomerForm()})));
    }

    _createCustomer() {
        this._customerForm.customer = new Customer();
        this._modalForm.show();
    }

    _editCustomer(id) {
        let customer = this._customers.find(id);
        this._customerForm.customer = customer;
        this._modalForm.show();
    }

    _confirmRemoveCustomer(id) {
        let customer = this._customers.find(id);
        this._modalConfirmRemove.update(
            `Você tem certeza que deseja remover definitivamente o(a) cliente <strong>${customer.fullname}</strong> do sistema?`, 
            customer.id);
        this._modalConfirmRemove.show();
    }
}