import { contas } from "../bancoDeDados/bancodedados.js"
import { encontrarConta, msgJson, propInformada, verificarSenha } from "../servicos/servicos.js"

export const verificarNumeroConta = (req, res, next) => {
    const { path } = req.route
    const arrayRotas = [
        [':numeroConta', 'params', 'numeroConta'],
        ['transacoes', 'body', 'numero_conta'],
        ['/contas/saldo', 'query', 'numero_conta'],
        ['/contas/extrato', 'query', 'numero_conta']
    ]
    for (let rota of arrayRotas) {
        if (path.includes(rota[0])) {
            const contaNaoExiste = encontrarConta(rota[1], rota[2], req, res)
            if (contaNaoExiste) return msgJson(...contaNaoExiste)
            next()
        } 
    }
}

export const senhaCorreta = (req, res, next) => {
    const { path } = req.route
    const arrayRotas = [['transacoes', 'body'],['saldo', 'query'], ['extrato', 'query']]
    for (let rota of arrayRotas) {
        if (path.includes(rota[0])) {
            const senhaNaoEncontrada = verificarSenha(rota[1], req, res)
            if (senhaNaoEncontrada) return msgJson(...senhaNaoEncontrada) 
        }
    } 
    next()
}

export const saldoSuficiente = (req, res, next) => {
    const { valor } = req.body, { saldo } = req.contaAtual, { method } = req
    if (method === 'DELETE') {
        if (saldo !== 0) return msgJson(400, res, 'A conta só pode ser removida se o saldo for zero!') 
        return next()
    }
    const valorNaoinformado = propInformada('valor', valor, res)
    if (valorNaoinformado) return msgJson(...valorNaoinformado)
    if (!(valor > 0) || typeof valor !== 'number') { 
        return msgJson(400, res, 'Insira um número maior que zero e valido!')
    }
    if (valor > saldo || saldo <= 0) return msgJson(400, res, 'Saldo insuficiente!')
    next()
}

export const propsUsuarioValidas = (req, res, next) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body
    const arrayProps = [
        [nome, 'nome'],
        [cpf, 'cpf'],
        [data_nascimento, 'data_nascimento'],
        [telefone, 'telefone'],
        [email, 'email'],
        [senha, 'senha']
    ]
    for (let prop of arrayProps) {
        const propNaoInformada = propInformada(prop[1], prop[0], res)
        if (propNaoInformada) return msgJson(...propNaoInformada)
        if (typeof prop[0] !== 'string') return msgJson(400, res, 'As informações precisam estar entre aspas')
    }
    next()
}

export const emailOuCpfJaexiste = (req, res, next) => {
    const { email, cpf } = req.body
    const { numeroConta } = req.params
    const emailCpfEncontrado = contas.find(conta => {
        if (conta.usuario.email === email) {
            if (conta.numero === numeroConta) return false
            return true
        }
        if (conta.usuario.cpf === cpf) {
            if (conta.numero === numeroConta) return false
            return true
        }
    })
    if (emailCpfEncontrado !== undefined) return msgJson(400, res, 'Já existe uma conta com o cpf ou e-mail informado!')
    next()
}

export const verificarOrigemDestino = (req ,res, next) => {
    const { numero_conta_origem, numero_conta_destino } = req.body
    const origemNum = propInformada('conta origem', numero_conta_origem, res)
    const destinoNum = propInformada('conta destino', numero_conta_destino, res)
    if (origemNum) return msgJson(...origemNum)
    if (destinoNum) return msgJson(...destinoNum)
    if (numero_conta_origem === numero_conta_destino) {
        return msgJson(400, res, 'Conta origem e destino não podem ser iguais')
    }
    const origemEncontrada = encontrarConta('body','numero_conta_origem',req, res)
    if (origemEncontrada) return msgJson(...origemEncontrada) 
    const destinoEncontrado = contas.find(conta => conta.numero === numero_conta_destino)
    if (destinoEncontrado === undefined) { 
        return msgJson(400, res , 'Destino não cadastrado. Precisa ser uma string!')
    }
    req.destino = destinoEncontrado
    next()
}

export const dataAgora = (req, res, next) => {
    const data = new Date().toLocaleString()
    let formaData = data.replace(',', '').split(' ')
    formaData[0] = formaData[0].split('/')
    formaData = `${formaData[0][2]}-${formaData[0][1]}-${formaData[0][0]} ${formaData[1]}`
    req.dataAtual = formaData
    next()
}

export const packPropsEmailCpf = [propsUsuarioValidas, emailOuCpfJaexiste]