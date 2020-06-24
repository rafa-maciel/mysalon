import FieldError from "../forms/FieldError";
import AuthenticationTokenService from "../services/AuthenticationTokenService";
import LocalStorageService from "../services/LocalStorageService";

export default class HttpHelper {
    constructor() {
        this._storageService = new LocalStorageService();
    }

    post(endpoint, data) {
        let transactionDetails = this._buildTransactionDetails('POST', data);
        return this._buildFetchTransaction(endpoint, transactionDetails);
    }

    get(endpoint) {
        let transactionDetails = this._buildTransactionDetails('GET', null);
        return this._buildFetchTransaction(endpoint, transactionDetails);
    }

    put(endpoint, data) {
        let transactionDetails = this._buildTransactionDetails('PUT', data);
        return this._buildFetchTransaction(endpoint, transactionDetails);
    }

    delete(endpoint) {
        let transactionDetails = this._buildTransactionDetails('DELETE', null);
        return fetch(endpoint, transactionDetails)
            .then(res => {
                if (res.ok) {
                    return true;
                }
            
                throw new Error('A transactional error has been happened.');
            });
    }

    _buildTransactionHeaders() {
        return new Headers({
            'Content-type': 'Application/json',
            'Authorization': this._storageService.authToken.fullToken
        });
    }

    _buildTransactionDetails(method, data) {
        return {
            'method': method,
            'body': data,
            'headers': this._buildTransactionHeaders()
        }
    }

    _buildFetchTransaction(endpoint, transactionDetails) {
        return fetch(endpoint, transactionDetails)
            .then(res => {
                if (res.ok) {
                    return res.json().then(data =>  data).catch(err => true);
                }
                
                throw new Error('A transactional error has been happened.');
            });
    }
}