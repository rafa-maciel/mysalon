import Component from "./Component";

export default class LoginPageLayout extends Component{
    constructor(parentNode) {
        super(parentNode);
    }

    get loginNode() {
        const loginPageId = "#loginForm"
        return this._component.querySelector(loginPageId);
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
                    <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                    <div class="col-lg-6">
                        <div class="p-5">
                        <div class="text-center">
                            <h1 class="h4 text-gray-900 mb-4">MySaloon Web!</h1>
                            <p>Simplificando o gerenciamento do seu salão</p>
                        </div>
                        <div id="loginForm"></div>
                        <hr>
                        <div class="text-center">
                            <a class="small" href="forgot-password.html">Esqueceu sua senha?</a>
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