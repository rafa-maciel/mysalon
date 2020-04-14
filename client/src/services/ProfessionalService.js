import Professional from "../models/Professional";
import FieldError from "../forms/FieldError";
import HttpHelper from "../helpers/HttpHelper";

export default class ProfessionalService {
    constructor() {
        this._serverURL = `${SERVICE_URL}/professionals`;
        this._http = new HttpHelper();
    }

    getAllProfessionals() {
        let endpoint = this._serverURL;
        return this._http.get(endpoint)
            .then(dataArray => dataArray.map(data => this._getProfessionalFromData(data)));
    }

    getProfessionalByID(id) {
        let endpoint = `${this._serverURL}/${id}`;
        return this._http.get(endpoint)
            .then(data => this._getProfessionalFromData(data))
            .catch(error => {
                console.log(error);
                throw new Error('Ocorreu um error na comunição com o servidor e não foi possivel encontrar o profissional solicitado');
            });
    }

    createProfessional(professionalDto) {
        let endpoint = this._serverURL;
        return this._http.saveModel(endpoint, 'POST',  JSON.stringify(professionalDto))
            .then(data => this._getProfessionalFromData(data));
    }

    updateProfessional(professionalDto) {
        let endpoint = `${this._serverURL}/${professionalDto.id}`;

        return this._http.saveModel(endpoint, 'PUT', JSON.stringify(professionalDto))
            .then(data => this._getProfessionalFromData(data));
    }

    deteleProfessional(id) {
        let endpoint = `${this._serverURL}/${id}`;
        return this._http.deleteModel(endpoint);
    }

    _getProfessionalFromData(data) {
        return new Professional(data['name'], data['residencialPhone'], data['cellphone'], data['department'], data['id']);
    }
}