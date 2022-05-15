
const urlBase = "https://pi-cobranca-back-end.herokuapp.com";


export const urls = {
    transacao: {
        bancos: `${urlBase}/bancos`,
        clientes: `${urlBase}/clientes`,
        cadastrar: `${urlBase}/transacao`,
        trasacoes: `${urlBase}/transacoes`,
        cancelar: `${urlBase}/trasancao/cancelar`,
        baixar: `${urlBase}/trasancao/baixar`
    }
}