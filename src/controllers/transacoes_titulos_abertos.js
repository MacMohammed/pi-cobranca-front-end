import '../components/TransactionsList';
import AbstractView from './AbstractView';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Transações Abertas");
    }

    async getHtml() {
        const element = document.createElement('transaction-table');
        return element;
    }
}

