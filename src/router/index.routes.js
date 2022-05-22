import GerarArquivo from "../controllers/gerar_arquivo"
import ExportarArquivo from "../controllers/arquivo_exportar"
import ImportarArquivo from "../controllers/arquivo_importar"
import ConsultarArquivo from "../controllers/arquivo_consultar"
import Login from "../controllers/login"
import CadastroTransacoes from "../controllers/transacoes"
import CadastroBanco from "../controllers/bank/CadastroBanco"
import UserRegister from "../controllers/user/UserRegister"
import TransacoesAbertas from "../controllers/transacoes_titulos_abertos"
import TransacoesLiquidadas from "../controllers/transacoes_titulos_liquidados"
import TransacoesCanceladas from "../controllers/transacoes_titulos_cancelados"

export const navigateTo = url => {
    history.pushState(null, null, url);
    router();
}

export const router = async () => {
    const routes = [
        { path: "/login", view: Login },
        { path: "/", view: Login },
        { path: "/gerar-arquivo", view: GerarArquivo },
        { path: "/exportar-arquivo", view: ExportarArquivo },
        { path: "/importar-arquivo", view: ImportarArquivo },
        { path: "/consultar-arquivo", view: ConsultarArquivo },
        { path: "/cadastro-transacao", view: CadastroTransacoes },
        { path: "/cadastro-banco", view: CadastroBanco },
        { path: "/cadastro-usuario", view: UserRegister },
        { path: "/transacoes-abertas", view: TransacoesAbertas },
        { path: "/transacoes-liquidadas", view: TransacoesLiquidadas },
        { path: "/transacoes-canceladas", view: TransacoesCanceladas },
    ]


    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        };
    });

    let match = potentialMatches.find(potentialMatche => potentialMatche.isMatch);

    if (!match) {
        match = {
            route: routes[0],
            isMatch: true
        };
    }

    const view = new match.route.view();

    if (match.route.path == "/" || match.route.path == "/login") {
        document.querySelector("menu").style.display = "none";
        document.getElementById("saldacao").style.display = "none"
    }

    let root = document.querySelector("#root");

    root.innerHTML = "";
    
    root.appendChild(await view.getHtml());
}