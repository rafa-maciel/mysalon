import Component from "./Component";

export default class LogoutPageLayout extends Component {
    constructor(parentNode, listenerAction) {
        super(parentNode);

        this._component.querySelector("form").addEventListener(listenerAction.type, listenerAction.action);
    }

    _base(info) {
        return `
        <div class="container">
            <!-- Outer Row -->
            <div class="row justify-content-center">

            <div class="col-xl-10 col-lg-12 col-md-9">

                <div class="card o-hidden border-0 shadow-lg my-5">
                <div class="card-body p-0">
                    <!-- Nested Row within Card Body -->
                    <div class="row">
                    <div class="col-lg-6 d-none d-lg-block bg-logout-image"></div>
                    <div class="col-lg-6">
                        <div class="p-5">
                        <div class="text-center">
                            <h1 class="h4 text-gray-900 mb-4">MySaloon Web!</h1>
                            <p>Simplificando o gerenciamento do seu salão</p>
                        </div>
                        <div>
                            <form>
                                <h1 class="text-center">Você está se deslogando do sistema</h1>
                                <hr>
                                <button type="submit" class="btn btn-primary btn-block">Continuar</button>
                                
                            <form>
                            <a href="./app.html" class="btn btn-info btn-block">Cancelar</a>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

            </div>

        </div>
        `
    }
}