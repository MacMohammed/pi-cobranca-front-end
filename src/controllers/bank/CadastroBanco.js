import '../../components/bank/BankForm';
import AbstractView from '../AbstractView';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Cadastro de Banco");
    }

    async getHtml() {
        const element = document.createElement('bank-cadastro');
        return element;
    }
}