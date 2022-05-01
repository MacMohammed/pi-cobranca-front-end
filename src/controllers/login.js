import AbstractView from './AbstractView';
import view from '../views/login.html';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Login");
    }

    async getHtml() {
        const element = document.createElement('div');
        element.innerHTML = view;
        
        const form = element.querySelector("#login");

        form.addEventListener("submit", e => {
            e.preventDefault();

            const form = document.querySelector("#login")
            this.getLogin(form)
                .then(r => {
                    console.log(r)
                });

        })

        return element;

        // const element = document.createRange().createContextualFragment(`
        //     <form id="login">
        //         <fieldset class="group">
        //             <div class="field"> 
        //                 <br>
        //                 <H1 id="title">Seja Bem-Vindo</H1>
        //                 <sub><strong>Faça seu Login</strong></sub>
        //                 <br>
        //             </div>

        //             <div class="field">
        //                 <label for="username"><strong>Usuário</strong></label>
        //                 <input type="text" name="username" id="username" required>
        //             </div>
        //             <br>
        //             <div class="field">
        //                 <label for="password"><strong>Senha</strong></label>
        //                 <input type="password" name="password" id="password" required>
        //                 <br>
        //                 <br>
        //                 <a class= "link" href="../rec_senha/rec_senha_email.html"><strong>Esqueceu sua senha?</strong></a>
        //             </div>

        //             <div class="field">
        //                 <br>
        //                 <button class="button" type="submit" id="btn-entrar">Entrar</button>
        //                 <button class="button" type="button" id="btn-sair">Sair</button>       
        //             </div>
        //         </fieldset>
        //     </form>
        // `);

        // const btnSair = element.querySelector('#btn-sair');
        // btnSair.addEventListener("click", () => {
        //     alert("O botão de sair foi clicado...")
        // })

        // return element;
    }


    getLogin = async form => {
        const data = Object.fromEntries(new FormData(form));

        console.log(data);


        const response = await fetch('https://pi-cobranca-back-end.herokuapp.com/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify({
                "id_usuario": 1,
                "nome": data.username,
                "senha": data.password,
                "ativo": true,
                "id_cargo": 1,
            })
        });

        return await response.json();
    }
}