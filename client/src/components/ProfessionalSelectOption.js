import Component from "./Component";
import DOMParserUtil from "../helpers/DOMParserUtil";
import ProfessionalService from "../services/ProfessionalService";

export default class ProfessionalSelectOption extends Component {
    constructor(parentSelector, professionalInitial, onChangeListener) {
        super(parentSelector, {
            "id": 'professionalSelector',
        });

        this._professional = professionalInitial;
        this._onChangeListener = onChangeListener;     
    }

    _init() {
        super._init();

        new ProfessionalService().getAllProfessionals()
            .then(professionals => {
                this._professionals = professionals
                this._refresh();
                this._selectEl = this._component.querySelector("select");
                this._initOnChangeSelectOption(this._onChangeListener);
            });   
    }

    _initOnChangeSelectOption(onChangeListener) {
        this._selectEl.addEventListener("change", event => {
            event.preventDefault();
            let parameter = this.getParameter();
            onChangeListener(parameter);
        });
    }

    getParameter() {
        let name = this._selectEl.getAttribute("name");
        let value = this._selectEl.value;

        return name+"="+value;
    }

    _refresh() {
        this._component.appendChild(this._template());
    }
    
    _template() {

        let template = `
        <div>
            <div class="form-group">
            <label for="professionalId">Profissional Responsável</label>
            <select class="form-control" name="professionalId">
                <option value="">Todos</option>
                    ${this._professionals.map(professional => `
                    <option value="${professional.id}" ${this._professional && this._professional.id == professional.id ? 'selected' : 'null'}>${professional.name}</option>
                    `).join('')}
            </select>
            </div>
        </div>
        `;

        return DOMParserUtil.parse(template);
    }

    _base(info) {
        return `
        <form class="form-inline" id="${info.id}">
           
        </form>
        `;
    }
}