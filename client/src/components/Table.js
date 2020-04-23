import Component from './Component';

export default class Table extends Component {
    _updateList(trList) {
        let body = document.querySelector(`${this._tag} tbody`);
        body.innerHTML = '';
        trList.forEach(tr => body.appendChild(tr));
    }

    _appendItem(tr) {
        document.querySelector(`${this._tag} tbody`).appendChild(tr);
    }

    _cleanTable() {
        document.querySelector(`${this._tag} tbody`).innerHTML = "";
    }

    _removeLine(key) {
        document.querySelector(`${this._tag} tbody tr[data-key="${key}"]`).remove();
    }

    _updateLine(key, tr) {
        let line = document.querySelector(`${this._tag} tbody tr[data-key="${key}"]`);
        line.parentNode.replaceChild(tr, line);
    }

    _createTableLine(lineKey, data, ...actions) {
        let line = document.createElement('tr');
        line.setAttribute('data-key', lineKey);

        data.forEach(prop => {
            let col = document.createElement('td');
            col.innerHTML = prop;
            line.appendChild(col);
        });
        if (actions) {
            let col = document.createElement('td');
            actions.forEach(a => col.appendChild(a));
            line.appendChild(col);
        }

        return line;
    }

    _base(info) {
        return `
        <table class="table table-hover" id=${info.id}>
            <thead>
                <tr>
                    ${info.headers.map(title => `
                        <th scope="col">${title}</th>
                    `).join('')}
                </tr>
            </thead>
            <tbody>
                ${info.initialContent ? initialContent : ''}
            </tbody>
        </table>
        `;
    }
}