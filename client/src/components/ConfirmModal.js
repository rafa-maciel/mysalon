import Modal from "./Modal";

export default class ConfirmModal extends Modal{
    /* 
        Info {
            "id": modal id attribute,
            "title": modal title,
            "buttonLabel": button action for confirm action,
            "onConfirm": action on confirm;
            "listeners": listeners for modal actions
        }
    */
    constructor(parentSelector, info, removeAction) {
        super(parentSelector, info);
        this._removeAction = removeAction;
    }

    _init() {
        super._init();

        this._component.querySelector(`${this._tag} form`).addEventListener('submit', event => {
            event.preventDefault();
            let key = document.querySelector(`${this._tag} form input[name="key"]`).value;
            this._removeAction(key);
        });
    }

    update(message, value) {
        document.querySelector(`${this._tag} .modal-body .alert`).innerHTML = message;
        document.querySelector(`${this._tag} form input[name="key"]`).value = value;
    }


    _base(info) {
        return `
        <div id="${info.id}" class="modal fade" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-sm" role="document">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title">${info.title}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body">
                <div class="alert alert-danger" role="alert">
                    ${info.message}
                </div>
                <p class="text-muted">Essa ação não poderá ser desfeita</p>
                <form>
                    <input type="hidden" name="key">
                    <button class="btn btn-danger btn-sm btn-block" type="submit">${info.buttonLabel}</button>
                </form>
                </div>
            </div>
            </div>
        </div>
        `;
    }
}