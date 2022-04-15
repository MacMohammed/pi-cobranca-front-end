const template = document.createElement("template");

template.innerHTML = `
    <style>
      color: "#fff";
    </style>
    <div id="toggle-info">
        <p>Isso é um teste</p>
        <button id="toggle-info">Fechar</button>
    </div>
`;

class CustomModal extends HTMLElement {
  constructor() {
    super();

    this.showInfo = true;

    this.attachShadow({ mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));

  }

  toggleInfo() {
      console.log('toogle info');
  }

  connectedCallback() {
      this.shadowRoot
        .querySelector('#toggle-info')
        .addEventListener('click', () => this.toggleInfo())
  }

  disconnectedCallback() {
      this.shadowRoot
        .querySelector('#toggle-info')
        .removeEventListener();
  }
}

window.customElements.define("custom-modal", CustomModal);