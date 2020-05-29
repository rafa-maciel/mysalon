import Component from './Component'
import DOMParserUtil from '../helpers/DOMParserUtil';

export default class NavTabPanel extends Component {
    constructor(parenteSelector, info) {
        super(parenteSelector, info);
        const tabpreid = 'navtabpn-';
    }

    addTab(tabTitle, tabIdentification, active=false) {
        let navTabs = this._component.querySelector('ul.nav-tabs');
        navTabs.appendChild(this._createTabItem(tabTitle, tabIdentification, active));

        let navContent = this._component.querySelector('div.tab-content');
        navContent.appendChild(this._createTabContent(tabIdentification, active));

        return {
            'contentId': '#'  + tabIdentification + '-content',
            'tabId': '#'  + tabIdentification + '-tab'
        };
    }

    setTabAs(id, disable=true) {
        if (disable) {
            this._component.querySelector('ul.nav-tabs ' + id).classList.add('disabled');
        } else {
            this._component.querySelector('ul.nav-tabs ' + id).classList.remove('disabled');
        }
    }

    setAsActive(id, contentId) {
        this._component.querySelectorAll('ul.nav-tabs li a').forEach(item =>  item.classList.remove('active'));
        this._component.querySelectorAll('div.tab-content div').forEach(item =>  {
            item.classList.remove('active')
            item.classList.remove('show');
        });
    
        this._component.querySelector(id).classList.add('active');
        this._component.querySelector(contentId).classList.add('show');
        this._component.querySelector(contentId).classList.add('active');

    }

    _createTabItem(title, id, active=false) {
        let item = `   
        <li class="nav-item" role="presentation">
            <a class="nav-link ${active ? 'active' : ''}" id="${id}-tab" data-toggle="tab" href="#${id}-content" role="tab" aria-controls="${title}" aria-selected="true">${title}</a>
        </li>
        `

        return DOMParserUtil.parse(item);
    }

    _createTabContent(id, active=false) {
        let content = `
            <div class="tab-pane fade ${active ? 'show active' : ''}" id="${id}-content" role="tabpanel" aria-labelledby="${id}-tab"></div>
        `
        return DOMParserUtil.parse(content);
    }
    

    _base(info) {
        return `
            <div>
                <ul class="nav nav-tabs" role="tablist">
                </ul>
                <div class="tab-content">
                </div>
            </div>
        `;
    }

}