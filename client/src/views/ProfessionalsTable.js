import ModelTable from "../components/ModelTable";
import Button from "../components/Button"
import ListenerAction from "../components/ListenerAction"

export default class ProfessionalsTable extends ModelTable {
    constructor(parentSelector, editAction, removeAction, restorePasswordAction) {
        super(parentSelector, {
            'id': 'professionalsList',
            'headers': ['#', 'Nome', 'Àrea de Atuação', 'Telefone', 'Celular', 'E-mail', 'Ações'],
        });

        this._editAction = editAction;
        this._removeAction = removeAction;
        this._restorePasswordAction = restorePasswordAction;
    }

    _createLineTableFromModel(professional) {
        let btnEdit = new Button('Editar', 'btn btn-outline-primary btn-sm', 'button', 
            new ListenerAction('click', () => this._editAction(professional.id)));
        
        let btnRemove = new Button('Remover', 'btn btn-outline-danger btn-sm', 'button', 
            new ListenerAction('click', () => this._removeAction(professional.id)));
        
        let btnRestore = new Button('Resetar', 'btn btn-outline-warning btn-sm', 'button', 
            new ListenerAction('click', () => this._restorePasswordAction(professional.email)));

        let colorField = this._createColorField(professional.identifiedColor);

        return this._createTableLine(professional.id, 
            [colorField, professional.name, professional.departament, professional.residencialPhone, professional.cellphone, professional.email], 
            btnEdit, btnRemove, btnRestore);
    }

    _createColorField(colorString) {
        let el = document.createElement('div');
        el.style['backgroundColor'] = colorString;
        el.style['height'] = '10px';
        el.style['width'] = '10px';
        el.style['border-radius'] = '50%';
        el.style['margin'] = 'auto 0';

        return el;
    }
}