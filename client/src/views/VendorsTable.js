import Button from "../components/Button";
import ListenerAction from "../components/ListenerAction";
import ModelTable from "../components/ModelTable";

export default class VendorsTable extends ModelTable{
    constructor(parentSelector, editAction, removeAction) {
        super(parentSelector, {
            'id': 'vendorsList',
            'headers': ['Nome', 'Telefone', 'Telefone', 'Notas', 'Ações'],
        });

        this._editAction = editAction;
        this._removeAction = removeAction;
        this._vendors = [];
    }

    _createLineTableFromModel(vendor) {
        let btnEdit = new Button('Editar', 'btn btn-outline-primary btn-sm', 'button', 
            new ListenerAction('click', () => this._editAction(vendor.id)));
        
        let btnRemove = new Button('Remover', 'btn btn-outline-danger btn-sm', 'button', 
            new ListenerAction('click', () => this._removeAction(vendor.id)));

        return this._createTableLine(vendor.id, 
            [vendor.name, vendor.phone, vendor.secondaryPhone, '<pre>' + vendor.notes + '</pre>'], 
            btnEdit, btnRemove);
    }
}