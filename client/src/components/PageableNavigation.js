import Component from "./Component";
import DOMParserUtil from "../helpers/DOMParserUtil";
import Button from "./Button";
import ListenerAction from "./ListenerAction";

export default class PageableNavigation extends Component {

    constructor(parentSelector, info={}, pageAction) {
        super(parentSelector, info);
        this._pageAction = pageAction;
    }

    update(pageable) {
        document.querySelector(this._tag).innerHTML = "";
        document.querySelector(this._tag).appendChild(this._template(pageable));
        this._createPaginationNavButtons(pageable).forEach(item => 
            document.querySelector(this._tag + ' .pagination').appendChild(item));
    }

    _createPaginationNavButtons(pageable) {
        let nav = [];
        let previousBtn = new Button('Anterior', 'page-link', 'button', 
            new ListenerAction('click', () => this._pageAction(pageable.previous)));

        nav.push(this._createListItem(!pageable.hasPrevious, previousBtn));

        for (let index = 0; index < pageable.totalPages ; index++) {
            let btn = new Button((index+1), 'page-link', 'button', 
                new ListenerAction('click', () => this._pageAction(index)));
            
            nav.push(this._createListItem(pageable.number == index, btn));
        }

        let nextBtn = new Button('Proxima', 'page-link', 'button', 
            new ListenerAction('click', () => this._pageAction(pageable.next)));

        nav.push(this._createListItem(!pageable.hasNext, nextBtn));

        return nav;
    }

    _createListItem(disabled=false, button) {
        let item = document.createElement("li");
        item.classList = `page-item ${disabled ? 'disabled' : ''}`;

        item.appendChild(button);
        return item;
    }
    
    _template(pageable) {
        let template = pageable ? `
        <div>
            <p class='text-muted'>Exibindo ${pageable.numberOfElements} de ${pageable.totalElements}</p>
            <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                </ul>
            </nav>
        </div>
        ` : '';

        return DOMParserUtil.parse(template);
    }



    _base(info) {
        return `
        <div class="row>
            <div class="col-sm-12 col-md-5">
                <div id='${info.id}'><div>
            </div>
        </div>
        `;
    }
}