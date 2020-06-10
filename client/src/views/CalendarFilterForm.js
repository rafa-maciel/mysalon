import Form from "../components/Form";
import ProfessionalService from "../services/ProfessionalService";
import DOMParserUtil from "../helpers/DOMParserUtil";

export default class CalendarFilterForm extends Form {
    constructor(parentSelector, ...listeners) {
        super(parentSelector, {
            'id': 'calendarFilter',
            'defaultButtons': true,
            listeners
        });

        this._professionals = [];
        this._professional = undefined;

        new ProfessionalService().getAllProfessionals()
            .then(professionals => {
                this._professionals = professionals
                this.updateFields();
            });
    }

    set professional(professional) {
        this._professional = professional;
        this.updateFields();
    }

    get professional() {
        return this._professional;
    }

    _template() {
        let template = `
            <div class="form-group">
                <label for="professionalId">Profissional Responsável</label>
                <select class="form-control" name="professionalId">
                <option value="">Todos</option>
                    ${this._professionals.map(professional => `
                    <option value="${professional.id}" ${this._professional && this._professional.id == professional.id ? 'selected' : 'null'}>${professional.name}</option>
                    `).join('')}
                </select>
            </div>
        `;

        return DOMParserUtil.parse(template);
    }

}