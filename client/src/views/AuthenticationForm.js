import Form from '../components/Form';
import DOMParserUtil from '../helpers/DOMParserUtil';
import AuthenticationDTO from '../dtos/AuthenticationDTO';

export default class AuthenticationForm extends Form {
    constructor(parentSelector, ...listeners) {
        super(parentSelector, {
            'id': 'authenticationForm',
            'formClass': 'user form-signin needs-validation',
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
            <div class="form-group">
                <input type="email" name="email" class="form-control form-control-user ${this._isInvalid ? 'is-invalid' : ''}" 
                    id="email" aria-describedby="emailHelp" placeholder="Entre com o e-mail cadastrado">
            </div>
            <div class="form-group">
                <input type="password" name="password" class="form-control form-control-user ${this._isInvalid ? 'is-invalid' : ''}" id="password" placeholder="Senha">
            </div>

            ${this._isInvalid ? 
                `
                <div class="alert alert-warning" role="alert">
                    E-mail ou senha invalidos!
                </div>
                ` : ''}

            
            <button type="submit" class="btn btn-primary btn-user btn-block">
                Entrar
            </button>
        </div>
        `;

        return DOMParserUtil.parse(template);
    }
}