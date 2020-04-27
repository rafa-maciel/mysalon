import ModelTable from "../components/ModelTable";
import Button from "../components/Button";
import ListenerAction from "../components/ListenerAction";
import PageableNavigation from "../components/PageableNavigation";

export default class CustomersTable extends ModelTable{
    constructor(parentSelector, editAction, removeAction) {
        super(parentSelector, {
            'id': 'cList',
            'headers': ['Nome', 'Profissional Responsável', 'Telefone', 'Celular', 'Ações'],
        });

        this._editAction = editAction;
        this._removeAction = removeAction;
    }

    _createLineTableFromModel(customer) {
        let btnEdit = new Button('Editar', 'btn btn-outline-primary btn-sm', 'button', 
            new ListenerAction('click', () => this._editAction(customer.id)));
        
        let btnRemove = new Button('Remover', 'btn btn-outline-danger btn-sm', 'button', 
            new ListenerAction('click', () => this._removeAction(customer.id)));

        return this._createTableLine(customer.id, 
            [customer.fullname, customer.professionalEngaged, customer.residencialPhone, customer.cellphone], 
            btnEdit, btnRemove);
    }
}