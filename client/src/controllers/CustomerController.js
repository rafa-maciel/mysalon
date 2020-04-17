import ProxyModelView from "../helpers/BindProxyModelView";
import ModelList from "../models/ModelList";
import CustomerListView from "../views/CustomerListView";
import CustomerService from "../services/CustomerService";
import AlertMessage from "../models/AlertMessage";
import AlertMessageView from "../views/AlertMessageView";
import CustomerForm from "../forms/CustomerForm";
import ProfessionalService from "../services/ProfessionalService";
import CustomerFormView from "../views/CustomerFormView";
import CustomerFilterForm from "../forms/CustomerFilterForm";
import CustomerFilterFormView from "../views/CustomerFilterFormView";

export default class CustomerController {
    constructor() {
        this._customersList = new ProxyModelView(new ModelList(), 
            new CustomerListView(document.querySelector('#customerList')),
            'add', 'remove', 'clean');

        this._form = new ProxyModelView(new CustomerForm(),
            new CustomerFormView(document.querySelector('#customerFormFields')),
            'clean', 'include', 'addErrors', 'updateProfessionalsList');

        this._filterForm = new ProxyModelView(new CustomerFilterForm(),
            new CustomerFilterFormView(document.querySelector("#customerFilter .form-fields")),
            'updateProfessionalsList');

        this._message = new ProxyModelView(new AlertMessage(),
            new AlertMessageView(document.querySelector('#alertMessage')), 
            'update');

        this._service = new CustomerService();

        this._init();
    }

    _init() {
        this.updateCustomerList();

        /* Update the form with professional list */
        new ProfessionalService().getAllProfessionals()
            .then(professionals => {
                this._form.updateProfessionalsList(professionals);
                this._filterForm.updateProfessionalsList(professionals);
        });

    }

    updateCustomerList() {
        this._customersList.clean();

        let dataFilter = this._filterForm.getJSONParameters();
        this._service.getCustomers(dataFilter)
            .then(pageableContent => {
                this._customersList.updatePageableInfo(pageableContent['pageable']);
                pageableContent['customers'].forEach(customer => {
                    this._customersList.add(customer);
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

    showNewCustomerForm() {
        this._form.clean();
        this._showFormModal();
    }

    showEditCustomerForm(id) {
        this._service.getCustomerByID(id)
            .then(customer => {
                this._form.include(customer);

            })
            .catch(error => {
                this._message.update(error, 'Não foi possivel encontrar o cliente solicitado', 'warning');
                this._showFormModal(false);
            });
    }

    saveCustomerForm() {
        let dto = this._form.convertToDTOModel();
        if (dto.id) {
            this._updateViewsFromSaveForm(
                this._service.updateCustomer(dto), 
                'atualizado'
            )
        } else {
            this._updateViewsFromSaveForm(
                this._service.createCustomer(dto), 
                'cadastrado'
            )
        }
    }

    deleteCustomer(id) {
        this._service.deleteCustomer(id)
            .then(() => {
                this._customersList.remove(id);
                this._message.update('Os dados do cliente foram removidos definitivamente',
                'Cliente removido!', 'info');
                this._showRemoveFormModal(false);
            }).catch(error => {
                this._message.update(error.message,
                    'Erro na operação!', 'warning');
                this._showRemoveFormModal(false);
            });
    }


    _updateViewsFromSaveForm(promisse, actionLabel) {
        promisse
            .then(customer => {
                this._customersList.add(customer);
                this._message.update(`${customer.fullname} foi ${actionLabel} com sucesso`,
                `Cliente ${actionLabel}!`, 
                'success');

                this._showFormModal(false);
            })
            .catch(fieldErrors => {
                this._form.addErrors(fieldErrors);
            });
    }

    _showFormModal(option=true) {
        if (option) {
            $("#modalCustomerRemove").modal("show");
        } else {
            $("#modalCustomerRemove").modal("hide");
        }
    }

    _showRemoveFormModal(option=true) {
        if (option) {
            $("#modalCustomerRemove").modal("show");
        } else {
            $("#modalCustomerRemove").modal("hide");
        }
    }

    


    
}