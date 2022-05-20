import AbstractView from "./AbstractView";
import view from '../views/form_transacao.html';

import { urls } from '../api/server';
import Modal from '../components/modal/Modal'
import { runModal } from "../uteis/uteis";
import { navigateTo } from "../router/index.routes";

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

        const token = localStorage.getItem('token');

        if (token === null) {
            navigateTo('/login')
            return;
        }

        const element = document.createElement('div');
        element.innerHTML = view;

        const selectBancos = element.querySelector("#bank");
        const selectClientes = element.querySelector("#clientname");
        const bancos = await this.getBancos();
        const clientes = await this.getClientes();

        bancos.map(x => {
            let option = document.createElement("option");
            option.appendChild(document.createTextNode(`${x.codigo_febraban} - ${x.nome}`));
            option.setAttribute("value", x.id);
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
        const response = await fetch(urls.transacao.bancos, this.options);
        const data = await response.json();

        return data;
    }

    getClientes = async () => {
        const response = await fetch(urls.transacao.clientes, this.options);
        const data = await response.json();

        return data;
    }

    postTransacao = async (f) => {
        const data = Object.fromEntries(new FormData(f));
        const url = urls.transacao.cadastrar
        
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
                "valor": parseFloat(data.valor.replace(',', '.')),
            })
        }

        /*Validação das datas de emissão e vencimento*/
        const dtEmissao = new Date(data.emissao);
        const dtVencimento = new Date(data.vencimento);

        if (dtEmissao > dtVencimento) {
            const formatDataEmissao = `${(dtEmissao.getDate()+1)}/${dtEmissao.getMonth()+1}/${dtEmissao.getFullYear()}`;
            const formatDataVencimento = `${(dtVencimento.getDate()+1)}/${dtVencimento.getMonth()+1}/${dtVencimento.getFullYear()}`;
            runModal(`A data de emissão (${formatDataEmissao}) não pode ser maior que a data de vencimento (${formatDataVencimento})`, "Transação cadastrada...");
            return;
        }


        fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Não foi possível cadastrar a nota ${data.nota}.`);
            }
            return response.json();
        })
        .then((data) => {
            runModal(data, "Transação cadastrada...");
        })
        .catch(err => {
            runModal(err, "Transação negada...", );
        })
    }

}