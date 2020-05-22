import ModelTable from "../components/ModelTable";
import Button from "../components/Button"
import ListenerAction from "../components/ListenerAction"

export default class ProfessionalsTable extends ModelTable {
    constructor(parentSelector, editAction, removeAction) {
        super(parentSelector, {
            'id': 'professionalsList',
            'headers': ['Nome', 'Àrea de Atuação', 'Telefone', 'Celular', 'E-mail', 'Ações'],
        });

        this._editAction = editAction;
        this._removeAction = removeAction;
    }

    _createLineTableFromModel(professional) {
        let btnEdit = new Button('Editar', 'btn btn-outline-primary btn-sm', 'button', 
            new ListenerAction('click', () => this._editAction(professional.id)));
        
        let btnRemove = new Button('Remover', 'btn btn-outline-danger btn-sm', 'button', 
            new ListenerAction('click', () => this._removeAction(professional.id)));

        return this._createTableLine(professional.id, 
            [professional.name, professional.departament, professional.residencialPhone, professional.cellphone, professional.email], 
            btnEdit, btnRemove);
    }
}