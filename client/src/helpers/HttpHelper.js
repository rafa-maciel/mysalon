import FieldError from "../forms/FieldError";
import AuthenticationTokenService from "../services/AuthenticationTokenService";

export default class HttpHelper {
    addToken(type, token) {
        let data = `${type} ${token}`;
        window.localStorage.setItem('msaloonwbtoken', data);
    }

    storeItem(label, value) {
        window.localStorage.setItem(label, value);
    }

    cleanToken() {
        window.localStorage.setItem('msaloonwbtoken', null);
    }

    get token() {
        return window.localStorage.getItem('msaloonwbtoken');
    }

    getStoredItem(label) {
        return window.localStorage.getItem(label);
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
            'Authorization': this.token
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