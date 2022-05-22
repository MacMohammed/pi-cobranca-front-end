class BankForm extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this._render()
    }

    _render() {
        const form = `
        <style>
            a {
                color: #92badd;
                display: inline-block;
                text-decoration: none;
                font-weight: 400;
            }

            h1 {
                text-align: center;
                font-size: 35px;
                font-weight: 700;
                text-transform: uppercase;
                margin: 20px 8px 10px 8px;
                color: #0d0d0d;
            }

            h2 {
                text-align: center;
                font-size: 16px;
                font-weight: 600;
                text-transform: uppercase;
                display: inline-block;
                margin: 0 8px 10px 8px;
                color: #cccccc;
            }

            

            /* STRUCTURE */

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

            /* TABS */

            h2.inactive {
                color: #cccccc;
            }

            h2.active {
                color: #0d0d0d;
                border-bottom: 2px solid #5fbae9;
            }

            /* FORM TYPOGRAPHY*/



            input[type=button], input[type=submit], input[type=reset] {
                background-color: #56baed;
                border: none;
                color: white;
                padding: 15px 80px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                text-transform: uppercase;
                font-size: 13px;
                -webkit-box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
                box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
                -webkit-border-radius: 5px 5px 5px 5px;
                border-radius: 5px 5px 5px 5px;
                margin: 5px 20px 40px 20px;
                -webkit-transition: all 0.3s ease-in-out;
                -moz-transition: all 0.3s ease-in-out;
                -ms-transition: all 0.3s ease-in-out;
                -o-transition: all 0.3s ease-in-out;
                transition: all 0.3s ease-in-out;
            }

            input[type=button]:hover, input[type=submit]:hover, input[type=reset]:hover {
                background-color: #39ace7;
            }

            input[type=button]:active, input[type=submit]:active, input[type=reset]:active {
                -moz-transform: scale(0.95);
                -webkit-transform: scale(0.95);
                -o-transform: scale(0.95);
                -ms-transform: scale(0.95);
                transform: scale(0.95);
            }

            input[type=date] {
                background-color: #f6f6f6;
                border: none;
                color: #757575;
                padding: 15px 32px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                margin: 5px;
                width: 70%;
                border: 2px solid #f6f6f6;
                -webkit-transition: all 0.5s ease-in-out;
                -moz-transition: all 0.5s ease-in-out;
                -ms-transition: all 0.5s ease-in-out;
                -o-transition: all 0.5s ease-in-out;
                transition: all 0.5s ease-in-out;
                -webkit-border-radius: 5px 5px 5px 5px;
                border-radius: 5px 5px 5px 5px;
            }

            input[type=text], input[type=password], input[type=email], input[type=tel], textarea, select {
                background-color: #f6f6f6;
                border: none;
                color: #0d0d0d;
                padding: 15px 32px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                margin: 5px;
                width: 70%;
                border: 2px solid #f6f6f6;
                -webkit-transition: all 0.5s ease-in-out;
                -moz-transition: all 0.5s ease-in-out;
                -ms-transition: all 0.5s ease-in-out;
                -o-transition: all 0.5s ease-in-out;
                transition: all 0.5s ease-in-out;
                -webkit-border-radius: 5px 5px 5px 5px;
                border-radius: 5px 5px 5px 5px;
            }

            input[type=text]:focus, input[type=password]:focus, input[type=email]:focus, input[type=tel]:focus, input[type=date]:focus, textarea:focus {
                background-color: #fff;
                border-bottom: 2px solid #0b415c;
            }

            input[type=text]:placeholder, input[type=password]:placeholder, input[type=email]:placeholder, input[type=tel]:placeholder, input[type=date]:placeholder, textarea:placeholder {
                color: #cccccc;
            }

            .button {
                display: inline-block;
                padding: 10px 20px;
                cursor: pointer;
                text-align: center;
                text-decoration: none;
                outline: none;
                color: #fff;
                background-color: #2C7970;
                border: none;
                border-radius: 15px;
                text-transform: uppercase;
                /* box-shadow: 0 9px #999; */
            }

            .button:hover {
                background-color: #11564e
            }

            .button:active {
                background-color: #032e29;
                /* box-shadow: 0 5px #666; */
                transform: translateY(4px);
            }

            li.container-button-group {
                display: flex;
                justify-content: flex-end;
            }

            .button-group {
                margin-bottom: 1rem;
                font-size: 0;
                padding: 1rem 0;
            }

            .button-group .button {
                margin: 0;
                margin-bottom: 1px;
                margin-right: 12px;
            }

            .button-group .button:last-child {
                margin: 0;
                margin-bottom: 1px;
                margin-right: 0;
            }

            .button.button__outline {
                background-color: transparent;
                color: #333;
                border: 1px solid #333;
            }

            /* .button.button__outline.button.button__outline--primary {
                border-color: #17aa17;
                color: #17aa17;
            } */

            /* .button.button__outline.button.button__outline--warn {
                border-color: #b61b1b;
                color: #b61b1b;
            } */

            .button.button__outline:hover, .button.button__outline.button.button__outline--primary:hover, .button.button__outline.button.button__outline--warn:hover {
                background-color: #333;
                border-color: #333;
                color: #fff;
            }

            .button.button__outline:focus, .button.button__outline.button.button__outline--primary:focus, .button.button__outline.button.button__outline--warn:focus {
                background-color: #f60;
                border-color: #f60;
                color: #fff;
            }

            .button.button__outline:active, .button.button__outline.button.button__outline--primary:active, .button.button__outline.button.button__outline--warn:active {
                background-color: #dd5800;
                border-color: #dd5800;
                color: #fff;
            }

            /* FORMULÁRIO */

            .container {
                width: 80%;
                max-width: 1200px;
                margin: 0 auto;
            }

            .container * {
                box-sizing: border-box;
            }

            .flex-outer, .flex-inner {
                list-style-type: none;
                padding: 0;
            }

            .flex-outer {
                max-width: 800px;
                margin: 0 auto;
            }

            .flex-outer li, .flex-inner {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
            }

            .flex-inner {
                padding: 0 8px;
                justify-content: space-between;
            }

            .flex-outer>li:not(:last-child) {
                margin-bottom: 20px;
            }

            .flex-outer li label, .flex-outer li p {
                padding: 8px;
                font-weight: 300;
                letter-spacing: .09em;
                text-transform: uppercase;
                font-size: 16px;
            }

            .flex-outer>li>label, .flex-outer li p {
                flex: 1 0 120px;
                max-width: 220px;
                font-weight: 400;
            }

            .flex-outer>li>label+*, .flex-inner {
                flex: 1 0 220px;
            }

            .flex-outer li p {
                margin: 0;
            }

            /* .flex-outer li input:not([type='checkbox']),
            .flex-outer li textarea {
                padding: 15px;
                border: none;
            } */

            .flex-outer li button {
                margin-left: auto;
                padding: 8px 16px;
                border: none;
                background: #333;
                color: #f2f2f2;
                text-transform: uppercase;
                letter-spacing: .09em;
                border-radius: 2px;
            }

            .flex-outer li .button-group button {
                margin-left: auto;
                padding: 8px 16px;
                border: none;
                background: #333;
                color: #f2f2f2;
                text-transform: uppercase;
                letter-spacing: .09em;
                border-radius: 5px;
            }

            .flex-inner li {
                width: 100px;
            }
        </style>
        <div class="container">
            <form>
                <div>
                    <h1>Cadastro de Bancos</h1>
                </div>
                <ul class="flex-outer">
                    <li>
                        <label for="bankcode">Código</label>
                        <input type="text" id="bankcode" placeholder="Digite o Código" required>
                    </li>
                    <li>
                        <label for="bankname">Nome do Banco</label>
                        <input type="text" id="bankname" placeholder="Digite o Nome do Banco" required>
                    </li>
                    <!--
                    <li>
                        <p>Status</p>
                        <ul class="flex-inner">
                            <label class="radio-custom">
                                <span class="radio-label">ativo</span>
                                <input type="radio" name="status" checked>
                                <span class="checkmark"></span>
                            </label>
                            <label class="radio-custom">
                                <span class="radio-label">inativo</span>
                                <input type="radio" name="status">
                                <span class="checkmark"></span>
                            </label>
                        </ul>
                    </li>
                    -->
                    
                    <li class="container-button-group">
                        <div class="button-group">
                            <button class="button button__outline">Salvar</button>
                            <button class="button button__outline">Cancelar</button>
                            <button class="button button__outline">Sair</button>
                            <!--
                            <input type="submit" value="Salvar" />
                            <input type="button" value="Cancelar" />
                            <input type="button" value="Sair" />
                            -->
                        </div>
                    </li>
                </ul>
            </form>
        </div>
        `
        const shadow = this.attachShadow({mode:'open'})
        shadow.innerHTML = form

        shadow.addEventListener('submit', event => {
            event.preventDefault();

            alert('Em construção...')
        })
    }
}

customElements.define('bank-cadastro', BankForm)