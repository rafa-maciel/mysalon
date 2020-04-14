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
        return fetch(endpoint, {method: 'DELETE'});
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
                });
        });
    }
}