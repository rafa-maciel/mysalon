import Form from "../components/Form";
import DOMParserUtil from "../helpers/DOMParserUtil";
import Service from "../models/Service";

export default class ServiceForm extends Form {
    constructor(parentSelector, ...listeners) {
        super(parentSelector, {
            'id': 'serviceForm',
            listeners
        });

        this._service = new Service();
        this.updateFields();
    }

    set service(service) {
        this._service = service;
        this.updateFields();
    }

    _template() {
        let template = `
            <div>
                <div class="form-group">
                    <label for="notes">Anotações/Informações</label>
                    <textarea class="form-control" name="serviceNotes">${this._service.notes ? this._service.notes : ''}</textarea>
                </div>
            </div>
        `;

        return DOMParserUtil.parse(template);
    }
}