export default class ModelView {
    constructor(viewElement) {
        this._element = viewElement;
    }

    _template(model) {
        throw new Error('Template method must be implemented');
    }

    update(model) {
        this._element.innerHTML = this._template(model);
    }
}