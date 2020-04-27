import FieldError from "../forms/FieldError";

export default class HttpHelper {
    saveModel(endpoint, method, data) {
        return new Promise((resolve, reject) => {
            fetch(endpoint, {
                method: method,
                body: data,
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
                    res.json().then(data => {resolve(data)});
                }
            });
        });
    }

    deleteModel(endpoint) {
        return new Promise((resolve, reject) => {
            fetch(endpoint, {method: 'DELETE'})
                .then(res => {
                    if (res.ok && res.status == 200) {
                        resolve('Model removed as requested');
                    } else {
                        reject(res.statusText);
                    }
                }).catch(error => {
                    reject(error);
                });
        });
    }

    get(endpoint) {
        return new Promise((resolve, reject) => {
            fetch(endpoint)
                .then(res => {
                    if (res.ok && res.status == 200) {
                        
                        res.json().then(data => {resolve(data)});
                    }else {
                        
                        reject(res.statusText);
                    }
                }).catch(error => {
                    reject(error);
                });
        });
    }

    getFiltered(endpoint, bodyData) {
        let url = `${endpoint}?${bodyData ? bodyData : ''}`;
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(res => {
                    if (res.ok && res.status == 200) {
                        
                        res.json().then(data => {resolve(data)});
                    }else {
                        
                        reject(res.statusText);
                    }
                }).catch(error => {
                    reject(error);
                });
        });
    }
}