import Professional from "../models/Professional";
import FieldError from "../forms/FieldError";

export default class ProfessionalService {

    getAllProfessionals() {
        return fetch(`${SERVICE_URL}/professionals`)
            .then(res => res.json())
            .then(dataArray => dataArray.map(data => new Professional(data['name'], data['residencialPhone'], data['cellphone'], data['department'], data['id'])));
    }

    createProfessional(professional) {
        return new Promise((resolve, reject) => {
            fetch(`${SERVICE_URL}/professionals`, {
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
}