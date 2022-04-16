
class TransactionList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.setTemplate();

    this.shadowRoot.addEventListener("click", (event) => {
      event.preventDefault();

      const id_transacao = event.composedPath()[2]["id"];
      const action = event.target.dataset["action"];

      if (action === "baixar") {
        this.baixarTitulo(id_transacao).then(result => {
          alert(result);
          this.setTemplate();
        });
      }

      if (action === "cancelar") {
        this.cancelarTitulo(id_transacao)
          .then(result => {
            alert(result);
            this.setTemplate();
          });
      }
    });
  }

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

                    input[type=submit] {
                      border: none;
                      cursor: pointer;
                      background-color: transparent;
                      color: #3498db;
                    }

                    input:hover[type="submit"] {
			              color: red;
		              }

                </style>

          

          <div>
            <h3>Títulos em Aberto</h3>
            <form>
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
                      <th colspan="2" style="text-align: center;">Ações</th>
                  </thead>
                  <tbody>
                      ${
                        data
                          ? data
                              .filter((e) => e.liquidado === "false" && e.cancelado === "false")
                              .map((e) => {
                                console.log(e)
                                return `<tr id="${e.id}">
                                          <td>${e.id}</td>
                                          <td>${e["dt-hr-reg"]}</td>
                                          <td>${e.emissao}</td>
                                          <td>${e.vencimento}</td>
                                          <td>${e.nota}</td>
                                          <td>R$${e.valor}</td>
                                          <td>${e.cliente}</td>
                                          <td>${e.banco}</td>
                                          <td>
                                            <input type="submit" data-action="baixar" value="Baixar" />
                                          </td>
                                          <td>
                                            <input type="submit" data-action="cancelar" value="Cancelar" />
                                          </td>
                                      </tr>`;
                              })
                              .join("")
                          : ""
                      }
                  </tbody>
              </table>
            </form>
          </div>`;
  }

  options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  getTransactions = async () => {
    const resp = await fetch("h`https://pi-cobranca-back-end.herokuapp.com/transacoes", this.options);
    const data = await resp.json();
    return data;
  };

  baixarTitulo = async (id) => {
    const response = await fetch(`https://pi-cobranca-back-end.herokuapp.com/trasancao/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    return json;
  };

  cancelarTitulo = async (id) => {
    const response = await fetch(`https://pi-cobranca-back-end.herokuapp.com/trasancao/cancelar/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    return json;
  };
}

customElements.define("transaction-table", TransactionList);
