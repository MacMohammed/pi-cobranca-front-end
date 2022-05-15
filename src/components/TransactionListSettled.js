import { urls } from '../api/server';

class TransactionListSettled extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode:'open'})
        this.setTemplate();
    }

    options = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
    };

    async setTemplate() {
        const data = await this.getTransactions();
    
        this.shadowRoot.innerHTML = `
                <style>
                    h3 {
                        color: #009879;
                    }
                    .styled-table {
                        border-collapse: collapse;
                        margin: 25px 0;
                        font-size: 0.9em;
                        font-family: sans-serif;
                        min-width: 400px;
                        width: 100%;
                        box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
                    }
                    
                    .styled-table thead tr {
                        background-color: #009879;
                        color: #ffffff;
                        text-align: left;
                    }
                    
                    .styled-table th,
                    .styled-table td {
                        padding: 12px 15px;
                    }
                    
                    .styled-table tbody tr {
                        border-bottom: 1px solid #dddddd;
                    }
                    
                    .styled-table tbody tr:nth-of-type(even) {
                        background-color: #f3f3f3;
                    }
                    
                    .styled-table tbody tr:last-of-type {
                        border-bottom: 2px solid #009879;
                    }
                    
                    .styled-table tbody tr:hover td, .table tbody tr:hover th {
                        background-color: #eeeeea;
                    }
                </style>

                <div>
                    <h3>Títulos Liquidados</h3>
                    <table class="styled-table">
                        <thead>
                            <th>ID</th>
                            <th>Registro</th>
                            <th>Emissão</th>
                            <th>Vencimento</th>
                            <th>Nota</th>
                            <th>Valor</th>
                            <th>Cliente</th>
                            <th>Banco</th>
                            <th>Liquidado Em</th>
                        </thead>
                        <tbody>
                            ${
                            data
                                ? data
                                    .filter(e => e.liquidado === 'true')
                                    .map((e) => {
                                    console.log(e.liquidado)
                                    return `<tr id="${e.id}">
                                                <td>${e.id}</td>
                                                <td>${e["dt-hr-reg"]}</td>
                                                <td>${e.emissao}</td>
                                                <td>${e.vencimento}</td>
                                                <td>${e.nota}</td>
                                                <td>R$${e.valor}</td>
                                                <td>${e.cliente}</td>
                                                <td>${e.banco}</td>
                                                <td>${e["liquidado-em"]}</td>
                                            </tr>`;
                                    })
                                    .join("")
                                : ""
                            }
                        </tbody>
                    </table>
                </div>`;
      }

    getTransactions = async () => {
        const resp = await fetch(urls.transacao.trasacoes, this.options);
        const data = await resp.json();
        return data;
    };
}

customElements.define('transaction-list_settled', TransactionListSettled)