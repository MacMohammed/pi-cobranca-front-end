
const urlBase = "https://pi-cobranca-back-end.herokuapp.com";


export const urls = {
    transacao: {
        bancos: `${urlBase}/bancos`,
        clientes: `${urlBase}/clientes`,
        cadastrar: `${urlBase}/transacao`,
        trasacoes: `${urlBase}/transacoes`,
        cancelar: `${urlBase}/trasancao/cancelar`,
        baixar: `${urlBase}/trasancao/baixar`,
        extornar: `${urlBase}/trasancao/extornar`,
    },
    login: `${urlBase}/login`,
    cargo: {
        cargo: `${urlBase}/cargo`,
        criar: `${urlBase}/cargo/criar`,
        atualizar: `${urlBase}/cargo/atualizar`,
        excluir: `${urlBase}/cargo/excluir`,
    },
    usuario: {
        cadastrar: `${urlBase}/usuario`
    }
}