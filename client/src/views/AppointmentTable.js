import ModelTable from "../components/ModelTable";
import Button from "../components/Button";
import DateFormat from "../helpers/DateFormatHelper";
import ListenerAction from "../components/ListenerAction";

export default class AppointmentTable extends ModelTable {
    constructor(parentSelector, editAction, removeAction) {
        super(parentSelector, {
            'id': 'appointmentsTable',
            'headers': ['Cliente', 'Profissional', 'Data', 'Horário', 'Termino', 'Titulo', 'Concluido', 'Ações']
        });

        this._editAction = editAction;
        this._removeAction = removeAction;
    }

    _createLineTableFromModel(appointment) {
        let btnEdit = new Button('Editar', 'btn btn-outline-primary btn-sm', 'button',
            new ListenerAction('click', () => this._editAction(appointment.id)));
            
        let btnRemove = new Button('Remover', 'btn btn-outline-danger btn-sm', 'button',
        new ListenerAction('click', () => this._removeAction(appointment.id)));

        return this._createTableLine(appointment.id, [appointment.customer.fullname, appointment.professional.name, 
            DateFormat.toString(appointment.date), appointment.time, appointment.endTime, appointment.title, 
            appointment.done ? 'Sim' : 'Não'], btnEdit, btnRemove);
    }
}