import AbstractView from './AbstractView';
import view from '../views/arquivo_importar.html';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Importar Arquivo");
    }

    async getHtml() {
        const element = document.createElement('div');
        element.innerHTML = view;
        return element;

        // return `
        //     <div class="arq-import">
        //         <h1>Teste em gerar a visão "Importar Arquivo"</h1>
        //     </div>
        // `
    }
}