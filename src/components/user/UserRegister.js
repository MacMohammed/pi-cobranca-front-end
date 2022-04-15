class UserRegister extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:'open'})
        this.setTemplate();
    }

    async setTemplate() {
        this.shadowRoot.innerHTML = `
            <h1>Aqui será implementado o cadastro de usuário</h1>
        `
    }
}

customElements.define('user-register', UserRegister)
