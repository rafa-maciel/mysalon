import Proxy from './ProxyFactory'

export default class ProxyModelComponent {
    constructor(model, component, ...props) {
        let proxy = Proxy.create(model, props, model => component.updateFromModel(model));
        component.updateFromModel(model);

        return proxy;
    }
}