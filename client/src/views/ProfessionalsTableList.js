import Table from "../components/Table";
import Button from "../components/Button"
import ListenerAction from "../components/ListenerAction"

export default class ProfessionalsTableList extends Table{
    constructor(parentSelector, editAction, removeAction) {
        super(parentSelector, {
            'id': 'professionalsList',
            'headers': ['Nome', 'Àrea de Atuação', 'Telefone', 'Celular', 'Ações'],
        });

        this._editAction = editAction;
        this._removeAction = removeAction;
        this._professionals = [];
    }

    add(professional) {
        this._professionals.push(professional);
        this._appendItem(this._getItemFromProfessional(professional));
    }

    update(professional) {
        this._professionals.forEach((item, index) => {
            if (item.id == professional.id) this._professionals[index] = professional;
        });

        this._updateLine(professional.id, this._getItemFromProfessional(professional));
    }

    clean() {
        this._professionals = [];
        this._cleanTable();
    }

    find(id) {
        return this._professionals.find(professional => professional.id == id);
    }

    remove(id) {
        return this._professionals.filter(professional => {
            if (professional.id != id) return true;
            this._removeLine(id);
        });
    }
    
    _getItemFromProfessional(professional) {
        let btnEdit = new Button('Editar', 'btn btn-outline-primary btn-sm', 'button', 
            new ListenerAction('click', () => this._editAction(professional.id)));
        
        let btnRemove = new Button('Remover', 'btn btn-outline-danger btn-sm', 'button', 
            new ListenerAction('click', () => this._removeAction(professional.id)));

        return this._createTableLine(professional.id, 
            [professional.name, professional.departament, professional.residencialPhone, professional.cellphone], 
            btnEdit, btnRemove);
    }
}