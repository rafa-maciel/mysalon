import Component from "./Component";
import DOMParserUtil from "../helpers/DOMParserUtil";

export default class PageableNavigation extends Component {

    update(pageable) {
        document.querySelector(this._tag).innerHTML = "";
        document.querySelector(this._tag).appendChild(this._template(pageable));
    }
    
    _template(pageable) {
        let template = pageable ? `
        <div>
            <p class='text-muted'>Exibindo ${pageable.numberOfElements} de ${pageable.totalElements}</p>
            <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                    <li class="page-item ${pageable.first ? 'disabled' : ''}">
                        <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
                    </li>
                    ${[...Array(pageable.totalPages).keys()].map(i =>
                        `
                        <li class="page-item"><a class="page-link" href="#">${i+1}</a></li>
                        `
                    ).join('')}
                    <li class="page-item ${pageable.last ? 'disabled' : ''}">
                        <a class="page-link" href="#">Next</a>
                    </li>
                </ul>
            </nav>
        </div>
        ` : '';

        return DOMParserUtil.parse(template);
    }

    _base(info) {
        return `<div id='${info.id}'><div>`;
    }
}