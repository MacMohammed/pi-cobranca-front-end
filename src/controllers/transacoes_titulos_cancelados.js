import '../components/TransactionListCancel';
import AbstractView from './AbstractView';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Transações Liquidadas");
    }

    async getHtml() {
        const element = document.createElement('transaction-list_cancel');
        return element;
    }
}