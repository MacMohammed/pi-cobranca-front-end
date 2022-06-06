// import { urls } from '../../api/server';
import Chart from "chart.js/auto";
import { urls } from "../../api/server";

const canvas = document.createElement("template");
canvas.innerHTML = `
                    <style>
                      h1 {
                        color: rgb(43, 122, 120);
                        font-weight: bold;
                      }

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
                      overflow: hidden;
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
                      font-weight: 120;
                      letter-spacing: .09em;
                      text-transform: uppercase;
                      font-size: 16px;
                  }
                  
                  .flex-outer>li>label, .flex-outer li p {
                      flex: 1 0 120px;
                      max-width: 220px;
                      font-weight: 200;
                  }
                  
                  .flex-outer>li>label+*, .flex-inner {
                      flex: 1 0 220px;
                  }
                  
                  .flex-outer li p {
                      margin: 0;
                  }
                                  
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
                    width: 30%;
                    -webkit-transition: all 0.5s ease-in-out;
                    -moz-transition: all 0.5s ease-in-out;
                    -ms-transition: all 0.5s ease-in-out;
                    -o-transition: all 0.5s ease-in-out;
                    transition: all 0.5s ease-in-out;
                    -webkit-border-radius: 5px 5px 5px 5px;
                    border-radius: 5px 5px 5px 5px;
                }


                      input[type=date]:focus {
                          background-color: #fff;
                      }
                      
                      input[type=date]:placeholder {
                          color: #cccccc;
                      }

                      li {
                        float: left;
                      }

                      li.container-button-group {
                        display: flex;
                        justify-content: flex-end;
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




                    </style>
  
                    <div class="container">
                      <form id="form-bi">
                        <h1>Quantidade de transações emitidas por período</h1>
                        <ul class="flex-outer">
                          <li>
                            <label for="dtinicial">Data inicial</label>
                              <input type="date" id="dtinicial" name="dtinicial" required>
                          </li>
                          <li>
                            <label for="dtfinal">Data final</label>
                              <input type="date" id="dtfinal" name="dtfinal" required>
                          </li>
                          <li class="container-button-group">
                            <div class="button-group">""
                                <button class="button button__outline" type="submit">Buscar</button>
                            </div>
                          </li>
                        </ul>
                      </form>
                      <div>
                        <canvas id="myChart" width="60" height="400"></canvas>
                      </div>
                    </div>`;

class Home extends HTMLElement {
  constructor() {
    super();
    let myChart = null;
  }

  connectedCallback() {
    this._render();
    this._renderChart();

    this.shadowRoot.addEventListener("submit", (e) => {
      e.preventDefault();
      const form = this.shadowRoot.querySelector("#form-bi");
      this.fillChart(form);
    });
  }

  fillChart = async (form) => {
    const formdata = Object.fromEntries(new FormData(form));
    const url = new URL(urls.transacao.trasacoes);

    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    url.searchParams.append("dt-ini", formdata.dtinicial);
    url.searchParams.append("dt-fin", formdata.dtfinal);

    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Não foi possível consultar as transações entre ${formdata.dtinicial} e ${formdata.dtfinal}.`
          );
        }
        return response.json();
      })
      .then((data) => {
        if (this.myChart != null) {
          this.myChart.destroy();
        }

        const label = `Transações emitidas entre ${formdata.dtinicial} e ${formdata.dtfinal}`;

        const labels = [
          ...new Set(data.map((item) => item["dt-hr-reg"].split(" ")[0])),
        ];

        const colors = this._setColumsChartColors(labels);
        const dataChart = [];

        labels.map((l) => {
          const qtd = data.filter(
            (item) => item["dt-hr-reg"].split(" ")[0] === l
          ).length;
          dataChart.push(qtd);
        });

        this.myChart = new Chart(this.shadowRoot.getElementById("myChart"), {
          type: "bar",
          data: {
            labels,
            datasets: [
              {
                label,
                backgroundColor: colors[0],
                borderColor: colors[1],
                borderWidth: 2,
                data: dataChart,
                fill: false,
                barThickness: 90,
              },
            ],
          },

          options: {
            plugins: {
              legend: {
                display: true,
                labels: {
                  color: "rgb(0, 0, 0)",
                },
                position: "top",
                fullSize: true,
                align: "center",
              },
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  _render() {
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(canvas.content.cloneNode(true));
  }

  _renderChart() {
    this.myChart = new Chart(this.shadowRoot.getElementById("myChart"), {
      type: "bar",
      data: {
        labels: ["Verde", "Azul", "Amarelo"],
        datasets: [
          {
            label: "Gráfico Teste da Página Inicial",
            backgroundColor: ["green", "blue", "yellow"],
            borderColor: "rgb(255, 99, 132)",
            data: [50, 10, 62],
            barThickness: 90,
          },
        ],
      },

      options: {
        plugins: {
          legend: {
            display: true,
            labels: {
              color: "rgb(0, 0, 0)",
            },
            position: "top",
            fullSize: true,
            align: "center",
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // const ctx = this.shadowRoot.getElementById("myChart").getContext("2d");

    // let chart = new Chart(ctx, {
    //   type: "bar",
    //   data: {
    //     labels: ["Verde", "Azul", "Amarelo"],
    //     datasets: [
    //       {
    //         label: "Gráfico",
    //         backgroundColor: ["green", "blue", "yellow"],
    //         borderColor: "rgb(255, 99, 132)",
    //         data: [50, 10, 62],
    //       },
    //     ],
    //   },

    //   options: {
    //     responsive: true,
    //     maintainAspectRatio: false,
    //     scales: {
    //       yAxes: [
    //         {
    //           ticks: {
    //             beginAtZero: true,
    //           },
    //         },
    //       ],
    //     },
    //   },
    // });
  }

  // _getLabelsChart = (data) => {
  //   const labels = [...new Map(data.map((item) => [item["emissao"], item])).values()];
  //   return labels;
  // }

  _setColumsChartColors = (data) => {
    const backgroundColor = [];
    const borderColor = [];
    const colors = [];

    data.map((x) => {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      backgroundColor.push("rgba(" + r + ", " + g + ", " + b + ", 0.8)");
      borderColor.push("rgba(" + r + ", " + g + ", " + b + ", 2.0)");
    });

    colors.push(backgroundColor);
    colors.push(borderColor);

    return colors;
  };
}

customElements.define("init-home", Home);