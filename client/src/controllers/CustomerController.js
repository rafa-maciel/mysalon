import ProxyModelView from "../helpers/BindProxyModelView";
import ModelList from "../models/ModelList";
import CustomerListView from "../views/CustomerListView";
import CustomerService from "../services/CustomerService";
import AlertMessage from "../models/AlertMessage";
import AlertMessageView from "../views/AlertMessageView";
import CustomerForm from "../forms/CustomerForm";
import ProfessionalService from "../services/ProfessionalService";
import CustomerFormView from "../views/CustomerFormView";

export default class CustomerController {
    constructor() {
        this._customersList = new ProxyModelView(new ModelList(), 
            new CustomerListView(document.querySelector('#customerList')),
            'add', 'remove');

        this._form = new ProxyModelView(new CustomerForm(),
            new CustomerFormView(document.querySelector('#customerFormFields')),
            'clean', 'include', 'addErrors', 'updateProfessionalsList');

        this._message = new ProxyModelView(new AlertMessage(),
            new AlertMessageView(document.querySelector('#alertMessage')), 
            'update');

        this._service = new CustomerService();

        this._init();
    }

    _init() {
        this._updateCustomerList();
        this._updateProfessionalsOnForm();
    }

    showNewCustomerForm() {
        this._form.clean();
        this._showFormModal();
    }

    saveCustomerForm() {
        let dto = this._form.convertToDTOModel();
        if (dto.id) {

        } else {
            this._service.createCustomer(dto)
                .then(customer => {
                    this._customersList.add(customer);
                    this._message.update(`${customer.fullname} foi cadastrado com sucesso`,
                    'Cliente Cadastrado!', 
                    'success');

                    this._showFormModal(false);
                })
                .catch(fieldErrors => {
                    this._form.addErrors(fieldErrors);
                });
        }
    }


    _updateProfessionalsOnForm() {
        new ProfessionalService().getAllProfessionals()
            .then(professionals => {
                this._form.updateProfessionalsList(professionals);
            });
    }

    _showFormModal(option=true) {
        if (option) {
            $("#modalCustomer").modal("show");
        } else {
            $("#modalCustomer").modal("hide");
        }
    }

    _updateCustomerList() {
        this._service.getCustomers()
            .then(customers => {
                customers.forEach(customer => {
                    this._customersList.add(customer);
                });
                this._message.update('A lista de costumers foi sincronizada com o servidor',
                    'Lista de Clientes atualizada!', 
                    'info');
            })
            .catch(error => {
                this._message.update(error.message,
                    'A conexão falhou',
                    'info');
            });
    }


    
}