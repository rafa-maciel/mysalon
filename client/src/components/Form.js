import Component from "./Component";

export default class Form extends Component{
     /* 
        Info {
            "id": form id attribute,
            "formClass": form class ex. 'form-horizontal',
            "initialContent": form fields,
            "buttons": true/false for form buttons,
            "initialButtons": for initial buttons content,
            "defaultButtons": true/false for default buttons,
            "listeners": listeners for form actions
        }
    */
    updateFields() {
        document.querySelector(`${this._tag} .fields`).innerHTML = '';
        document.querySelector(`${this._tag} .fields`).appendChild(this._template());
    }

    submit() {
        document.querySelector(this._tag).submit();
    }

    reset() {
        document.querySelector(this._tag).reset();
    }

    getData() {
        let data = {};
        $(this._tag).serializeArray().forEach(input => {
            data[input.name] = input.value;
        });
        return data;
    }

    _init() {
        super._init();

        if (this._info.initialContent) 
            this._component.querySelector(".fields").appendChild(this._info.initialContent);

        if (this._info.buttons && this._info.initialButtons)
            this._component.querySelector(".buttons").appendChild(this._info.initialButtons);

    }

    _base(info) {
        return `
        <form id=${info.id} ${info.formClass ? `class='${info.formClass}'` : ''}>
           <div class='fields'></div>
           <div class='buttons'>
                ${info.defaultButtons ? `
                <button type="submit" class="btn btn-primary">Salvar</button>
                <button type="reset" class="btn btn-secondary">Limpar</button>
                ` : ''}
           </div>
        </form>
        `;
    }

    _template() {
        throw new Error('the method fieldsTempalte must be implemented');
    }
}