import '../../components/home/Home';
import AbstractView from '../AbstractView';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Página inicial")
    }

    async getHtml() {
        const element = document.createElement('init-home');
        return element;
    }
}