import HttpHelper from "../helpers/HttpHelper";
import Vendor from '../models/Vendor';

export default class VendorService {
    constructor() {
        this._serverUrl = `${SERVICE_URL}/vendors`;
        this._http = new HttpHelper();
    }

    getAll() {
        return this._http.get(this._serverUrl)
            .then(dataArray => dataArray.map(data => this._getFromData(data)))
            .catch(error => {
                console.log(error);
                throw new Error('Não foi possivel listar os fornecedores');
            });
    }

    getById(id) {
        let endpoint = `${this._serverUrl}/${id}`;
        return this._http.get(endpoint)
            .then(data => this._getFromData(data));
    }

    create(vendorDto) {
        return this._http.post(this._serverUrl, JSON.stringify(vendorDto))
            .then(data => this._getFromData(data));
    }

    update(vendorDto) {
        let endpoint = `${this._serverUrl}/${vendorDto.id}`;
        return this._http.put(endpoint, JSON.stringify(vendorDto))
            .then(data => this._getFromData(data));
    }

    delete(id) {
        let endpoint = `${this._serverUrl}/${id}`;
        return this._http.delete(endpoint);
    }

    _getFromData(data) {
        return new Vendor(data['name'], data['phone'], data['secondaryPhone'], data['notes'], data['id']);
    }
}