import ModelTable from "../components/ModelTable";
import Button from "../components/Button";
import ListenerAction from "../components/ListenerAction";
import DateFormat from "../helpers/DateFormatHelper";

export default class PurchaseTable extends ModelTable {
    constructor(parentSelector, editAction, removeAction, showNotes) {
        super(parentSelector, {
            'id': 'purchasesTable',
            'headers': ['Data', 'Valor', 'Metodo De Pagamento', 'Fornecedor', 'Ações'],
        });

        this._editAction = editAction;
        this._removeAction = removeAction;
        this._showNotes = showNotes;
    }

    _createLineTableFromModel(purchase) {
        let btnEdit = new Button('Editar', 'btn btn-outline-primary btn-sm', 'button',
            new ListenerAction('click', () => this._editAction(purchase.id)));

        let btnRemove = new Button('Remover', 'btn btn-outline-danger btn-sm', 'button', 
            new ListenerAction('click', () => this._removeAction(purchase.id)));

        let btnShowNotes = new Button('Notas', 'btn btn-outline-info btn-sm', 'button', 
            new ListenerAction('click', () => this._showNotes(purchase.notes)));

        return this._createTableLine(purchase.id, 
            [DateFormat.toString(purchase.date), purchase.value, 
                purchase.paymentMethod.label, purchase.vendor], 
            btnShowNotes, btnEdit, btnRemove);
    }

}