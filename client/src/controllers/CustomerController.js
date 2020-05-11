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
import AuthFilterController from "../filters/AuthFilterController";

export default class CustomerController extends AuthFilterController {
    constructor() {
        super();
        this._service = new CustomerService();

        this._message = new ProxyModelView(new AlertMessage(),
            new AlertMessageView(document.querySelector('#alertMessage')), 
            'update');

        this._modalConfirmRemove = new ConfirmModal("main", {
            "id": "modalConfirmRemove",
            "title": "Remover Cliente", 
            "buttonLabel": "Remover definitivamente"
        }, id => {this.deleteCustomer(id)});

        this._modalForm = new Modal('main', {
            'id': 'mForm',
            'title': 'Formulário do Cliente',
            'footer': true
        });

        this._customerForm = new CustomerForm(this._modalForm.contentSelector);

        this._customers = new ProxyModelComponent(new ModelList(), 
            new CustomersTable('#customerList', 
                id => {this._editCustomer(id)}, 
                id => {this._confirmRemoveCustomer(id)}),
            'add', 'remove', 'clean');

        this._filter = new CustomerFilterForm('#customerFilter', new ListenerAction('submit', event => {
            event.preventDefault();
            this._filterCustomers()
        }));

        this._pageable = new PageableNavigation('#customerList', {
            'id': 'customerListPagination', 
        });

        this._init();
    }

    _init() {
        this._filterCustomers();
        this._initModalFormButtons();

        document.querySelector('.btn-create-customer').addEventListener('click', () => {this._createCustomer()});

    }

    _initModalFormButtons() {
        this._modalForm.updateFooter(
            new Button('Salvar', 'btn btn-primary btn-lg', 'button', 
                new ListenerAction('click', () => {this.saveCustomerForm()})));
    }

    saveCustomerForm() {
        let dto = this._customerForm.getCustomerDTO();
        let savePromisse = dto.id ? this._service.updateCustomer(dto) : this._service.createCustomer(dto);

        savePromisse.then(customer => {
            this._customers.add(customer);
            this._message.update(`Os dados do ${customer.fullname} foram salvos com sucesso`,
                `Dados Salvo`, 
                'success');

                this._modalForm.hide();
        }).catch(error => console.log(error));
    }

    deleteCustomer(id) {
        this._service.deleteCustomer(id)
            .then(() => {
                this._customers.remove(id);
                this._message.update('Os dados do cliente foram removidos definitivamente',
                'Cliente removido!', 'info');
            
            }).catch(error => {
                this._message.update(error.message,
                    'Erro na operação!', 'warning');
            });

        this._modalConfirmRemove.hide();
    }

    _filterCustomers() {
        this._customers.clean();

        let dataFilter = this._filter.getData();
        this._service.getCustomers(dataFilter)
            .then(pageableContent => {
                this._pageable.update(pageableContent['pageable']);
                pageableContent['customers'].forEach(customer => {
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
            });
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