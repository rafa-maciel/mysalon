import Component from "./Component";
import $ from 'jquery';

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

    _init() {
        super._init();
        this._header = this._component.querySelector(this._tag+"ModalHeader");
        this._body = this._component.querySelector(this._tag+"ModalBody");
        this._footer = this._component.querySelector(this._tag+"ModalFooter");

        if (this._info.initialContent) 
            this._body.appendChild(this._info.initialContent);

        if (this._info.footer && this._info.initialFooter)
            this._footer.appendChild(this._info.initialFooter);
    }

    show() {
        $(this._tag).modal('show');
    }

    hide() {
        $(this._tag).modal('hide')
    }


    updateContent(contentEl) {
        this._body.innerHTML = '';
        this._body.appendChild(contentEl);
    }

    cleanContent() {
        this._body.innerHTML = '';
    }

    updateContentText(contentEl) {
        this._body.innerHTML = '<pre>' + contentEl + '</pre>';
    }

    updateFooter(childEl) {
        this._footer.innerHTML = '';
        this._footer.appendChild(childEl);
    }

    cleanFooter() {
        this._footer.innerHTML = '';
    }

    get contentSelector() {
        return `${this._tag}ModalBody`;
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
                    <div class="modal-header" id="${info.id}modalHeader">
                        <h5 class="modal-title">${info.title}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
            
                    <div class="modal-body" id="${info.id}ModalBody">
                    </div>

                    ${info.footer ? `
                    <div class="modal-footer" id="${info.id}ModalFooter">
                        
                    </div>
                    ` : ''}
                </div>
            </div>
        </div>
        `;
    }
}