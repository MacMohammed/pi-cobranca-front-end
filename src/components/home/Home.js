// import { urls } from '../../api/server';
import Chart from "chart.js/auto";

class Home extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this._render();
    this._renderChart();
  }

  _render() {
    const shadow = this.attachShadow({ mode: "open" });
    const canvas = `
                    <h1>Página Inicial</h1>
                    <div>
                        <canvas id="myChart" width="400" height="400"></canvas>
                    </div>`;
    shadow.innerHTML = canvas;
  }

  _renderChart() {
    const ctx = this.shadowRoot.getElementById("myChart").getContext("2d");
    var chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Janeiro", "Fevereiro", "Março"],

        datasets: [
          {
            label: "Gráfico",
            backgroundColor: ["green", "blue", "yellow"],
            borderColor: "rgb(255, 99, 132)",
            data: [50, 10, 62],
          },
        ],
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }
}

customElements.define("init-home", Home);
