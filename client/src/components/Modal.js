import DOMParserUtil from "../helpers/DOMParserUtil";
import Component from "./Component";

export default class Modal extends Component{
    /* 
        Info {
            "id": modal id attribute,
            "label": modal aria-labelledby attribute,
            "modalClass": modal class ex. 'modal-lg',
            "title": modal title,
            "initialContent": modal body,
            "footer": true/false for modal footer,
            "initialFooter": for initial footer content,
            "listeners": listeners for modal actions
        }
    */
    show() {
        $(this._tag).modal('show');
    }

    hide() {
        $(this._tag).modal('hide')
    }

    updateContent(content) {
        document.querySelector(`${this._tag} .modal-body`).innerHTML = '';
        document.querySelector(`${this._tag} .modal-body`).appendChild(content);
    }

    updateFooter(footer) {
        document.querySelector(`${this._tag} .modal-footer`).innerHTML = '';
        document.querySelector(`${this._tag} .modal-footer`).appendChild(footer);
    }

    get contentSelector() {
        return `${this._tag} .modal-body`;
    }

    _init() {
        super._init();

        if (this._info.initialContent) 
            this._component.querySelector(".modal-body").appendChild(this._info.initialContent);

        if (this._info.footer && this._info.initialFooter)
            this._component.querySelector(".modal-footer").appendChild(this._info.initialFooter);
    }

    _initListeners(listeners) {
        if (listeners) {
            listeners.forEach(listener => {
                $(this._component).on(listener.type, listener.action);
            });
        }
    }

    _base(info) {
        return `
        <div id="${info.id}" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="${info.label ? info.label : 'myLargeModal'}" aria-hidden="true">
            <div class="modal-dialog ${info.modalClass ? info.modalClass : ''}" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${info.title}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
            
                    <div class="modal-body">
                    </div>

                    ${info.footer ? `
                    <div class="modal-footer">
                        
                    </div>
                    ` : ''}
                </div>
            </div>
        </div>
        `;
    }
}