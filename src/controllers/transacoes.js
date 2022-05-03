import AbstractView from "./AbstractView";
import view from '../views/form_transacao.html';
import Modal from '../components/modal/Modal'

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Transações");
    }

    options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }

    async getHtml() {
        const element = document.createElement('div');
        element.innerHTML = view;

        const selectBancos = element.querySelector("#bank");
        const selectClientes = element.querySelector("#clientname");
        const bancos = await this.getBancos();
        const clientes = await this.getClientes();

        bancos.map(x => {
            let option = document.createElement("option");
            option.appendChild(document.createTextNode(x.Name));
            option.setAttribute("value", x.Id_bank);
            selectBancos.insertBefore(option, selectBancos.lastChild)
        });


        clientes.map(c => {
            let option = document.createElement("option");
            option.appendChild(document.createTextNode(c.nome));
            option.setAttribute("value", c.id);
            selectClientes.insertBefore(option, selectClientes.lastChild)
        })

        const form = element.querySelector("#form-transacao");

        form.addEventListener("submit", e => {
            e.preventDefault();
            this.postTransacao(form);
        })

        return element;
    }

    getBancos = async () => {
        const response = await fetch('https://pi-cobranca-back-end.herokuapp.com/bancos', this.options);
        const data = await response.json();

        return data;
    }

    getClientes = async () => {
        const response = await fetch('https://pi-cobranca-back-end.herokuapp.com/clientes', this.options);
        const data = await response.json();

        return data;
    }

    postTransacao = async (f) => {
        const data = Object.fromEntries(new FormData(f));
        const url = "https://pi-cobranca-back-end.herokuapp.com/transacao"
        
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "emissao": data.emissao,
                "vencimento": data.vencimento,
                "nota": data.nota,
                "banco": data.banco,
                "cliente": data.cliente,
                "valor": parseFloat(data.valor),
            })
        }

        fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Não foi possível cadastrar a transação.');
            }
            return response.json();
        })
        .then((data) => {
            alert(data);
        })
        .catch(err => {
            if (document.getElementsByTagName("x-modal")[0]) {
                document.getElementsByTagName("x-modal")[0].remove();
            }

            const modal = document.createElement('x-modal');
            const divModalTitle = document.createElement('div');
            const divModalBody = document.createElement('div');

            divModalTitle.slot = "title";
            divModalTitle.innerHTML = "Transação negada...";

            divModalBody.slot = "body";
            divModalBody.innerHTML = `${err}`;

            modal.appendChild(divModalTitle);
            modal.appendChild(divModalBody);

            document.body.append(modal);
        })
    }

}