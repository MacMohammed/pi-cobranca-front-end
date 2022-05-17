import '../components/login/login';
import AbstractView from './AbstractView';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Login");
    }

    async getHtml() {
        const element = document.createElement('view-login');
        return element;
    }
}
