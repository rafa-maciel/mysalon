import ModelTable from "../components/ModelTable";
import Button from "../components/Button";
import DateFormat from "../helpers/DateFormatHelper";

export default class AppointmentTable extends ModelTable {
    constructor(parentSelector, editAction, removeAction) {
        super(parentSelector, {
            'id': 'appointmentsTable',
            'headers': ['Cliente', 'Profissional', 'Data', 'Horário', 'Titulo', 'Concluido', 'Ações']
        });

        this._editAction = editAction;
        this._removeAction = removeAction;
    }

    _createLineTableFromModel(appointment) {
        let btnEdit = new Button('Editar', 'btn btn-outline-primary btn-sm', 'button');
        let btnRemove = new Button('Remover', 'btn btn-outline-danger btn-sm', 'button');

        return this._createTableLine(appointment.id, [appointment.customer.fullname, appointment.professional.name, 
            DateFormat.toString(appointment.date), appointment.time, appointment.title, 
            appointment.done ? 'Sim' : 'Não'], btnEdit, btnRemove);
    }
}