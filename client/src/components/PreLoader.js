import Component from "./Component";
import DOMParserUtil from "../helpers/DOMParserUtil";

export default class PreLoader extends Component {
    constructor() {
        super('#dashboardLayout');
        this._initLoaderComponent();
    }

    start() {
        this._component.appendChild(this._loaderComponent);
        this._component.classList.add('pre-loader-running');
    }

    stop() {
        this._component.innerHTML = '';
        this._component.classList.remove('pre-loader-running');
    }

    run(promisse) {
        this.start();
        promisse.then(() => {this.stop()});
    }

    _initLoaderComponent() {
        let template = `
        <div class="loader-panel">
            <div id="loader4">
                <span class="loader loader-1"></span>
                <span class="loader loader-2"></span>
                <span class="loader loader-3"></span>
                <span class="loader loader-4"></span>
            </div>
        </div>
        `;

        this._loaderComponent = DOMParserUtil.parse(template);
    }

    _base() {
        return `
        <div class="row" id="preLoader">
            
        </div>
        `;
    }

}