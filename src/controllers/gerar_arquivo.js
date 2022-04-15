import AbstractView from './AbstractView';
import view from '../views/arquivo_gerar.html';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Gerar Arquivo");
    }

    async getHtml() {
        const element = document.createElement('div');
        element.innerHTML = view;
        return element;
    }
}