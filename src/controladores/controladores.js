import { banco, contas, depositos, saques, transferencias } from "../bancoDeDados/bancodedados.js"
import { msgJson, propInformada } from "../servicos/servicos.js"

export const listarContas = (req, res) => {
    const { senha_banco } = req.query
    const senhaNaoInformada = propInformada('senha do banco', senha_banco, res)
    if (senhaNaoInformada) return msgJson(...senhaNaoInformada)
    if (senha_banco !== banco.senha) return msgJson(403, res, 'Senha do banco invalida!')
    msgJson(200, res, contas)
}

export const criarConta = (req, res) => {
    let numero
    contas.length === 0 ? numero = 1 :
    numero = Number(contas[contas.length - 1].numero) + 1
    contas.push({
        numero: String(numero),
        saldo: 0,
        usuario: {...req.body}
    })
    msgJson(201, res)
}

export const atualizarConta = (req, res) => {
    const { contaAtual } = req
    contaAtual.usuario = {...req.body}
    msgJson(204, res)
}

export const deletarConta = (req, res) => {
    const { indiceConta } = req
    contas.splice(indiceConta, 1)
    msgJson(204, res)
}

export const depositarConta = (req, res) => {
    const { valor } = req.body
    const { contaAtual, dataAtual } = req
    const valorNaoinformado = propInformada('valor', valor, res)
    if (valorNaoinformado) return msgJson(...valorNaoinformado)
    if (valor <= 0 || typeof valor !== 'number') return msgJson(400, res, 'Informe um valor valido maior que 0!')
    contaAtual.saldo += valor
    depositos.push({data: dataAtual, numero_conta: contaAtual.numero, valor})
    msgJson(204, res)
}

export const sacarConta = (req, res) => {
    const { valor } = req.body
    const { contaAtual, dataAtual } = req
    contaAtual.saldo -= valor
    saques.push({ data: dataAtual, numero_conta: contaAtual.numero, valor})
    msgJson(200, res)
}

export const transferirConta = (req, res) => {
    const { contaAtual, destino, dataAtual } = req
    const { valor } = req.body
    contaAtual.saldo -= valor
    destino.saldo += valor
    transferencias.push({
        data: dataAtual,
        numero_conta_origem: contaAtual.numero,
        numero_conta_destino: destino.numero,
        valor
    })
    msgJson(204, res)
}

export const saldoConta = (req, res) => msgJson(200, res, { saldo: req.contaAtual.saldo})

export const extratoConta = (req, res) => {
    const { numero } = req.contaAtual
    const transferenciasEnviadasId = [], transferenciasRecebidasId = []
    const depositosId = depositos.filter(d => d.numero_conta === numero)
    const saquesId = saques.filter(s => s.numero_conta === numero)
    transferencias.forEach(t => {
        if (t.numero_conta_origem === numero) transferenciasEnviadasId.push(t)
        if (t.numero_conta_destino === numero) transferenciasRecebidasId.push(t)
    })
    msgJson(200, res, {
        depositos: depositosId,
        saques: saquesId,
        transferenciasEnviadas: transferenciasEnviadasId,
        transferenciasRecebidasId: transferenciasRecebidasId
    })
}