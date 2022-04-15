import '../components/TransactionListSettled';
import AbstractView from './AbstractView';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Transações Liquidadas");
    }

    async getHtml() {
        const element = document.createElement('transaction-list_settled');
        return element;
    }
}