class Modal extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["max-width", "width", "animate"];
  }

  get maxWidth() {
    return this.getAttribute("max-width");
  }

  get width() {
    return this.getAttribute("width");
  }

  get animate() {
    return this.getAttribute("animate");
  }

  close() {
    this.style.display = "none";
  }

  remove() {
    this.parentNode.removeChild(this);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (this.shadowRoot) {
      if (this.maxWidth) {
        this.shadowRoot.querySelector(".modal-content").style.maxWidth =
          this.getAttribute("max-width");
      } else {
        this.shadowRoot.querySelector(".modal-content").style.maxWidth =
          "768px";
      }

      if (this.width) {
        this.shadowRoot.querySelector(".modal-content").style.width =
          this.getAttribute("width");
      } else {
        this.shadowRoot.querySelector(".modal-content").style.width = "95%";
      }

      if (this.animate) {
        this.shadowRoot
          .querySelector(".modal-content")
          .classList.add("animate-top");
      } else {
        this.shadowRoot
          .querySelector(".modal-content")
          .classList.remove("animate-top");
      }
    }
  }

  connectedCallback() {
    let shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = `
      <style>
        .modal {
          display: block;
          position: fixed;
          z-index: 3000;
          padding-top: 100px;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: rgb(0,0,0);
          background-color: rgba(0,0,0,0.4);
          font-family: Verdana,sans-serif;
          font-size: 15px;
          line-height: 1.5;
        }
        .modal-content {
          background-color: #fefefe;
          margin: auto;
          width: 95%;
          max-width:768px;
        }
        #mydivheader {
          padding: 10px;
          z-index: 10;
          background-color: #2196F3;
          color: #fff;
        }
        #container{
          padding: 20px;
        }
        .btn, .button {
          border: none;
          display: inline-block;
          padding: 8px 16px;
          vertical-align: middle;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          background-color: inherit;
          text-align: center;
          cursor: pointer;
          white-space: nowrap;
        }
        .btn, .button {
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        .display-topright {
          position: relative;
          right: -9px;
          top: -33px;
          float: right;
        }
        @media (max-width:768px){
          .modal{
            padding-top:50px;
          }
        }
        .animate-top{
          position:relative;
          animation:animatetop 0.4s;
        }
        @keyframes animatetop{
          from{top:-300px;opacity:0}
          to{top:0;opacity:1}
        }
      </style>
      <div id="myModal" class="modal">
        <div class="modal-content">
          <div id="mydivheader">
            <slot name="title">
              <div>Default title</div>
            </slot>
            <span id='closeBtn' class="button display-topright" style='color:white;font-size:18px;top: -32px;float:right;padding: 7px 16px;'>×</span>
          </div>
          <div id="container" style='background-color:white;'>
            <slot name='body'>
              <div></div>
            </slot>
          </div>
        </div>
      </div>`;

    if (this.maxWidth) {
      shadowRoot.querySelector(".modal-content").style.maxWidth =
        this.getAttribute("max-width");
    }

    if (this.width) {
      shadowRoot.querySelector(".modal-content").style.width =
        this.getAttribute("width");
    }

    if (this.animate) {
      shadowRoot.querySelector(".modal-content").classList.add("animate-top");
    }

    shadowRoot.querySelector("#closeBtn").addEventListener("click", (e) => {
      this.style.display = "none";
    });
  }
}

window.customElements.define("x-modal", Modal);
