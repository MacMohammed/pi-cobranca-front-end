import { navigateTo, router }  from "./router/index.routes";
import './assets/css/main.scss'

window.addEventListener("popstate", router);

window.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href)
        }
    });
    router();
});