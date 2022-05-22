import { navigateTo } from '../../router/index.routes';
import { urls } from '../../api/server';

import { runModal } from '../../uteis/uteis';

class Login extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.attachShadow({
      mode: "open",
    });

    this.shadowRoot.innerHTML = `

        <style>
            .form-wrapper {
                display: flex;
                align-items: center;
                flex-direction: column;
                justify-content: center;
                width: 100%;
                min-height: 100%;
                padding: 20px;
            }
      
            #formContent {
                -webkit-border-radius: 10px 10px 10px 10px;
                border-radius: 10px 10px 10px 10px;
                background: #fff;
                padding: 30px;
                width: 90%;
                max-width: 450px;
                position: relative;
                padding: 0px;
                -webkit-box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
                box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
                text-align: center;
            }
      
            #formFooter {
                background-color: #f6f6f6;
                border-top: 1px solid #dce8f1;
                padding: 25px;
                text-align: center;
                -webkit-border-radius: 0 0 10px 10px;
                border-radius: 0 0 10px 10px;
            }

            .fadeInDown {
              -webkit-animation-name: fadeInDown;
              animation-name: fadeInDown;
              -webkit-animation-duration: 1s;
              animation-duration: 1s;
              -webkit-animation-fill-mode: both;
              animation-fill-mode: both;
          }
          
          @-webkit-keyframes fadeInDown {
              0% {
                  opacity: 0;
                  -webkit-transform: translate3d(0, -100%, 0);
                  transform: translate3d(0, -100%, 0);
              }
              100% {
                  opacity: 1;
                  -webkit-transform: none;
                  transform: none;
              }
          }
          
          @keyframes fadeInDown {
            0% {
                opacity: 0;
                -webkit-transform: translate3d(0, -100%, 0);
                transform: translate3d(0, -100%, 0);
            }
            100% {
                opacity: 1;
                -webkit-transform: none;
                transform: none;
            }

            @-webkit-keyframes fadeIn {
              from {
                  opacity: 0;
              }
              to {
                  opacity: 1;
              }
          }
          
          @-moz-keyframes fadeIn {
              from {
                  opacity: 0;
              }
              to {
                  opacity: 1;
              }
          }
          
          @keyframes fadeIn {
              from {
                  opacity: 0;
              }
              to {
                  opacity: 1;
              }
          }
          
          .fadeIn {
              opacity: 0;
              -webkit-animation: fadeIn ease-in 1;
              -moz-animation: fadeIn ease-in 1;
              animation: fadeIn ease-in 1;
              -webkit-animation-fill-mode: forwards;
              -moz-animation-fill-mode: forwards;
              animation-fill-mode: forwards;
              -webkit-animation-duration: 1s;
              -moz-animation-duration: 1s;
              animation-duration: 1s;
          }
          
          .fadeIn.first {
              -webkit-animation-delay: 0.4s;
              -moz-animation-delay: 0.4s;
              animation-delay: 0.4s;
          }
          
          .fadeIn.second {
              -webkit-animation-delay: 0.6s;
              -moz-animation-delay: 0.6s;
              animation-delay: 0.6s;
          }
          
          .fadeIn.third {
              -webkit-animation-delay: 0.8s;
              -moz-animation-delay: 0.8s;
              animation-delay: 0.8s;
          }
          
          .fadeIn.fourth {
              -webkit-animation-delay: 1s;
              -moz-animation-delay: 1s;
              animation-delay: 1s;
          }
          
          /* Simple CSS3 Fade-in Animation */
          
          .underlineHover:after {
              display: block;
              left: 0;
              bottom: -10px;
              width: 0;
              height: 2px;
              background-color: #56baed;
              content: "";
              transition: width 0.2s;
          }
          
          .underlineHover:hover {
              color: #0d0d0d;
          }
          
          .underlineHover:hover:after {
              width: 100%;
          }
          }

        </style>



        <div class="form-wrapper fadeInDown">
        <div id="formContent">
          <!-- Título -->
          <h1 class="active"> Seja Bem-Vindo </h1>
      
          <!-- Sub Titulo -->
          <h2 class="active"> Faça seu Login </h2>
      
          <!-- Login Form -->
          <!-- <form id="login" action="pag_inicial.html"> -->
          <form id="login">
            <input type="text" id="username" class="fadeIn second" name="username" placeholder="usuário">
            <input type="password" id="password" class="fadeIn third" name="password" placeholder="senha">
            <input type="submit" class="fadeIn fourth" value="entrar">
          </form>
      
          <!-- Recuperar senha -->
          <div id="formFooter">
            <a class="underlineHover" href="../rec_senha/rec_senha_email.html">Esqueceu sua senha?</a>
          </div>
        </div>
      </div>`;



    const form = this.shadowRoot.getElementById("login");
    form.addEventListener("click", (event) => {
        event.preventDefault();
        this.postLogin(form);
    })
  }

  postLogin = async (form) => {
    const data = Object.fromEntries(new FormData(form));
    const url = urls.login;

    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "senha": data.password,
            "nome": data.username
        })
    }

    if (data.password.length == 0 || data.username.length == 0) return;

    fetch(url, options)
    .then(response => {
        if (!response.ok) {
            if (response.status == 403) {
                throw new Error('Senha ou login inválidos.');
            } else {
                throw new Error('Não foi possível logar no sistema.');
            }
        }
        return response.json();
    })
    .then((data) => {

        window.localStorage.setItem('token', JSON.stringify(data.token));
        this.style.display = "none";
        document.querySelector("menu").style.display = "block";

        let labelName = document.querySelector("#label-name");
        labelName.innerHTML = "";
        labelName.innerHTML = `Bem vindo(a) ${data.name}`

        document.getElementById("saldacao").style.display = "block"
        // navigateTo(`${window.location.href}cadastro-transacao`);

        navigateTo('/cadastro-transacao');
    })
    .catch((err) => {
        runModal(err, "Não foi possível fazer o login")

        let username = this.shadowRoot.getElementById("username");
        let password = this.shadowRoot.getElementById("password");

        username.value = "";
        password.value = "";
        username.focus();
    })

  }
}

customElements.define("view-login", Login);
