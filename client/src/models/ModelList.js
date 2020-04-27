export default class ModelList {
    constructor() {
        this._list = [];
        this._pageableInfo = undefined;
    }

    clean() {
        this._list = [];
        this._pageableInfo = undefined;
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

    find(id) {
        return this._list.find(item => item.equalsFor(id));
    }

    updatePageableInfo(pageable) {
        this._pageableInfo = pageable;
    }

    remove(id) {
        this._list.forEach((item, i) => {
            if (item.equalsFor(id)) this._list.splice(i, 1);
        });
    }

    get list() {
        return this._list;
    }

    get pageableInfo() {
        return this._pageableInfo;
    }
}