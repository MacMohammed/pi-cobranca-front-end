import AbstractView from './AbstractView';
import view from '../views/login.html';

import { navigateTo }  from "../router/index.routes";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Login");
    }

    async getHtml() {

        const element = document.createElement('div');
        element.innerHTML = view;
        
        const form = element.querySelector("#login");

        form.addEventListener("submit", e => {
            e.preventDefault();

            const form = document.querySelector("#login")

            this.getLogin(form)
                .then(r => {
                    navigateTo(`${window.location.href}/transacoes`)
                });

        })

        return element;
    }


    getLogin = async form => {
        const data = Object.fromEntries(new FormData(form));

        const response = await fetch('http://localhost:8001/login', {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }, 

            body: JSON.stringify({
                "nome": data.username,
                "senha": data.password
            })
        });

        return await response.json();
    }
}