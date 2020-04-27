import Table from "./Table";

export default class ModelTable extends Table {
    updateFromModel(modelList) {
        this._cleanTable();
        modelList.list.forEach(model => this._appendItem(this._createLineTableFromModel(model)));
    }

    _createLineTableFromModel(model) {
        throw new Error('_createLineTableFromModel must been implemented');
    }
}