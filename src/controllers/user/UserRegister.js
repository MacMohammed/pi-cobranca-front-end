import '../../components/user/UserRegister';
import AbstractView from '../AbstractView';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Cadastro de Usuário");
    }

    async getHtml() {
        const element = document.createElement('user-register');
        return element;
    }
}