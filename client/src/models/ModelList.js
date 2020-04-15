export default class ModelList {
    constructor() {
        this._list = [];
    }

    clean() {
        this._list = [];
    }

    add(model) {
        if (this._list.some(item => item.equals(model))) {
            this._list.forEach((item, i) => {
                if (item.equals(model)) this._list[i] = model;
            });
        } else {
            this._list.push(model);
        }
    }

    remove(id) {
        this._list.forEach((item, i) => {
            if (item.equalsFor(id)) this._list.splice(i, 1);
        });
    }

    get list() {
        return this._list;
    }
}