
const urlBase = "http://localhost:8001";


export const urls = {
    transacao: {
        bancos: `${urlBase}/bancos`,
        clientes: `${urlBase}/clientes`,
        cadastrar: `${urlBase}/transacao`,
        trasacoes: `${urlBase}/transacoes`,
        cancelar: `${urlBase}/trasancao/cancelar`,
        baixar: `${urlBase}/trasancao/baixar`
    },
    login: `${urlBase}/login`
}