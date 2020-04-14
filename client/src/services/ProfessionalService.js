import Professional from "../models/Professional";
import FieldError from "../forms/FieldError";

export default class ProfessionalService {
    constructor() {
        this._serverURL = `${SERVICE_URL}/professionals`;
    }

    _handleErrors(response) {
        /* TODO - need to intercept the errors and throw an exception */
        return response;
    }

    _getProfessionalFromData(data) {
        return new Professional(data['name'], data['residencialPhone'], data['cellphone'], data['department'], data['id']);
    }

    getAllProfessionals() {
        return fetch(this._serverURL)
            .then(res => this._handleErrors(res))
            .then(res => res.json())
            .then(dataArray => dataArray.map(data => this._getProfessionalFromData(data)));
    }

    getProfessionalByID(id) {
        return fetch(`${this._serverURL}/${id}`)
            .then(res => this._handleErrors(res))
            .then(res => res.json())
            .then(data => this._getProfessionalFromData(data));
    }

    createProfessional(professional) {
        return new Promise((resolve, reject) => {
            fetch(this._serverURL, {
                method: 'POST',
                body: JSON.stringify(professional),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => {
                if (!res.ok) {
                    res.json().then(data => data['errors'])
                        .then(dataArray => {
                            reject(dataArray.map(data => new FieldError(data['field'], data['defaultMessage'])))
                        });
                } else {
                    res.json().then(data => new Professional(data['name'], data['residencialPhone'], data['cellphone'], data['department'], data['id']))
                        .then(model => {resolve(model)});
                }
            });
        });
    }

    updateProfessional(professionalDto) {
        return new Promise((resolve, reject) => {
            fetch(`${this._serverURL}/${professionalDto.id}`, {
                method: 'PUT',
                body: JSON.stringify(professionalDto),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => {
                if (!res.ok) {
                    res.json().then(data => data['errors'])
                        .then(dataArray => {
                            reject(dataArray.map(data => new FieldError(data['field'], data['defaultMessage'])))
                        });
                } else {
                    res.json().then(data => new Professional(data['name'], data['residencialPhone'], data['cellphone'], data['department'], data['id']))
                        .then(model => {resolve(model)});
                }
            });
        });
    }

    deteleProfessional(id) {
        return fetch(`${this._serverURL}/${id}`, {method: 'DELETE'});
    }
}