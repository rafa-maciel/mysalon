import Proxy from './ProxyFactory'

export default class BindProxyModelView {
    constructor(model, view, ...props) {
        let proxy = Proxy.create(model, props, model => view.update(model));
        view.update(model);

        return proxy;
    }
}