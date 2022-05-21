import { navigateTo, router }  from "./router/index.routes";
import './assets/css/main.scss'

window.addEventListener("popstate", router);

window.addEventListener("DOMContentLoaded", () => {
    const bnt_sair = document.getElementById("btn-sair");
    bnt_sair.addEventListener("click", () => {
        localStorage.removeItem("token")
        navigateTo("/")
    })

    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href)
        }
    });
    router();
});