import Form from "../components/Form";
import ModelTable from "../components/ModelTable";
import Button from "../components/Button";
import ListenerAction from "../components/ListenerAction";
import ModelList from "../models/ModelList";
import CustomerService from "../services/CustomerService";

export default class CustomerSelectTable extends ModelTable {
    constructor(parentSelector, selectAction) {
        super(parentSelector, {
            'id': 'customerSelectTable',
            'headers': ['Nome', 'Indicado Por', 'Profissional Responsável', 'Selecionar']
        });

        this._selectAction = selectAction;
        this._customers = new ModelList();
        this._customerService = new CustomerService();

        this._component.querySelector("#btnSearchCustomer").addEventListener('click', () => {this.search()});
    }

    search() {
        let name = this._component.querySelector("#searchCustomerName").value;
        let parameter = 'fullname=' + name;
        this._customers.clean();
        this._customerService.getCustomers(parameter)
            .then(pageable => {
                pageable['content'].forEach(customer => {this._customers.add(customer)});
                this.updateFromModel(this._customers);
            });
    }

    _base(info) {
        let searchPanel = `
            <div>
                <div class="form-group">
                    <label for="customerName">Nome do Cliente</label>
                    <div class="input-group">
                        <input type="text" class="form-control" aria-describedby="button-addon25" id="searchCustomerName">
                        <div class="input-group-append" id="button-addon25">
                            <button class="btn btn-outline-primary" type="button" id="btnSearchCustomer">Buscar</button>
                        </div>
                    </div>
                </div>
            <div>
        `;

        return searchPanel + super._base(info);
    }

    _createLineTableFromModel(customer) {
        let btnSelect = new Button('Selecionar', 'btn btn-outline-primary btn-sm', 'button',
            new ListenerAction('click', () => {this._selectAction(customer)}));
        
        return this._createTableLine(customer.id, 
            [customer.fullname, customer.indicatedBy, customer.professionalEngaged], btnSelect);
    }
}