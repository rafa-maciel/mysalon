import HttpHelper from "../helpers/HttpHelper";
import Purchase from "../models/Purchase";

export default class PurchaseService {
    constructor() {
        this._serverUrl = `${SERVICE_URL}/purchases`;
        this._http = new HttpHelper();
    }

    getPurchases(searchData=null) {
        let endpoint = this._serverUrl + '/search';
        if (searchData != null) 
            endpoint = endpoint + '?' + searchData;
        return this._http.get(endpoint)
            .then(dataArray => 
                dataArray.map(data => this._getPurchaseFromData(data)));
    }

    updatePurchase(purchaseDTO) {
        let endpoint = this._serverUrl + '/' + purchaseDTO.id;
        return this._http.put(endpoint, JSON.stringify(purchaseDTO))
            .then(data => this._getPurchaseFromData(data));
    }

    createPurchase(purchaseDTO) {
        let endpoint = this._serverUrl;
        return this._http.post(endpoint, JSON.stringify(purchaseDTO))
            .then(data => this._getPurchaseFromData(data));
    }

    deletePurchase(id) {
        let endpoint = this._serverUrl + "/" + id;
        return this._http.delete(endpoint);
    }

    _getPurchaseFromData(data) {
        return new Purchase(data['value'], data['date'], data['notes'], 
            data['paymentMethod'], data['vendorName'], data['id']);
    }
}