import ProxyModelView from "../helpers/BindProxyModelView";
import ModelList from "../models/ModelList";
import CustomerListView from "../views/CustomerListView";
import CustomerService from "../services/CustomerService";
import AlertMessage from "../models/AlertMessage";
import AlertMessageView from "../views/AlertMessageView";

export default class CustomerController {
    constructor() {
        this._customersList = new ProxyModelView(new ModelList(), 
            new CustomerListView(document.querySelector('#customerList')),
            'add', 'remove');

        this._message = new ProxyModelView(new AlertMessage(),
            new AlertMessageView(document.querySelector('#alertMessage')), 
            'update');

        this._service = new CustomerService();

        this._init();
    }

    _init() {
        this._updateCustomerList();
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