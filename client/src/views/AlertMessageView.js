import ModelView from "./ModelView";

export default class AlertMessageView extends ModelView{
    _template(model) {
        return `
        <div class="alert alert-${model.type} alert-dismissible fade show" role="alert">
            <h4 class="alert-heading">${model.title}</h4>
            <p class='text-muted'>${model.message}</p>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        `;
    }
}