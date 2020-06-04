import Form from "../components/Form";
import DOMParserUtil from "../helpers/DOMParserUtil";

export default class PasswordResetForm extends Form {
    constructor(parentSelector, ...listeners) {
        super(parentSelector, {
            'id': 'pwdResetForm',
            'defaultButtons': true,
            listeners
        });

        this.updateFields();
    }


    _template() {
        let template = `
        <div class="form-group">
          <label for="password">Senha</label>
          <input type="password" name="password" class="form-control" aria-describedby="passwordHelpInline">
          <small id="passwordHelpInline" class="text-muted">
            Deve conter entre 5 e 20 caracteres
          </small>
        </div>
        `;

        return DOMParserUtil.parse(template);
    }
}