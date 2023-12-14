import { contas } from "../bancoDeDados/bancodedados.js"

export const msgJson = (statusCode, objRes, msg = undefined) => {
    if (msg === undefined) return objRes.status(statusCode).json()

    if (typeof msg === 'object') return objRes.status(statusCode).json(msg)

    return objRes.status(statusCode).json({mensagem: msg})
}

export const propInformada = (stringProp, prop, objRes) => {
    let msgPropInvalida
    switch (stringProp) {
        case 'data_nascimento':
            msgPropInvalida = `informe o(a) data de nascimento`
            break
        default:
            msgPropInvalida = `informe o(a) ${stringProp}`
    }
    if (prop === undefined) return [400, objRes, msgPropInvalida]
    
    if (typeof prop === 'string') {
        if (prop.trim() === '') return [400, objRes, msgPropInvalida]
        return false    
    }
}

export const encontrarConta = (tipoId, nomeID, objReq, objRes) => {
    const numeroConta = objReq[tipoId][nomeID]
    const numeroNaoInformado = propInformada('numero da conta', numeroConta, objRes)
    
    if (numeroNaoInformado) return [...numeroNaoInformado]

    if (!(numeroConta >= 1) || typeof numeroConta !== 'string') { 
        return [400, objRes, 'Informe um número maior ou igual a 1. Precisa ser uma string']
    }
    const contaEncontrada = contas.find(({ numero }, index) => {
        if (numero === numeroConta) {
            objReq.indiceConta = index
            return true
        }
    })
    if (!contaEncontrada) return [404, objRes, 'O numero da conta não está cadastrado!']
    
    objReq.contaAtual = contaEncontrada
    return false
}

export const verificarSenha = (tipoSenha, objReq, objRes) => {
    const senhaInput = objReq[tipoSenha]['senha']
    const senhaUser = objReq.contaAtual.usuario.senha
    const senhaNaoValida = propInformada('senha', senhaInput, objRes)

    if (senhaNaoValida) return [...senhaNaoValida]
    if (senhaInput !== senhaUser) return [403, objRes, 'Sua Senha está incorreta']
    return false
}