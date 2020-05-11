import Form from '../components/Form';
import DOMParserUtil from '../helpers/DOMParserUtil';
import AuthenticationDTO from '../dtos/AuthenticationDTO';

export default class AuthenticationForm extends Form {
    constructor(parentSelector, ...listeners) {
        super(parentSelector, {
            'id': 'authenticationForm',
            'formClass': 'form-signin needs-validation',
            listeners
        });

        this.updateFields();
        this._isInvalid = false;
    }

    getAuthenticationDTO() {
        let data = this.getData();
        return new AuthenticationDTO(data['email'], data['password']);
    }

    invalidFormData() {
        this._isInvalid = true;
        this.updateFields();
    }

    _template() {
        let template = `
        <div>
            ${this._isInvalid ? 
                `
                <div class="alert alert-warning" role="alert">
                    E-mail ou senha invalidos!
                </div>
                ` : ''}


            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" min="3" max="20" class="form-control ${this._isInvalid ? 'is-invalid' : ''}" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="password">Senha</label>
                <input type="password" min="3" max="20" class="form-control  ${this._isInvalid ? 'is-invalid' : ''}" id="password" name="password" required>
            </div>

            <button type='submit' class='btn btn-primary btn-lg btn-block'>Entrar</button>
        </div>
        `;

        return DOMParserUtil.parse(template);
    }
}