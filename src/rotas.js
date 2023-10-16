import express from "express"
import {
    atualizarConta,
    criarConta,
    deletarConta,
    depositarConta,
    extratoConta,
    listarContas,
    sacarConta,
    saldoConta,
    transferirConta
} from "./controladores/controladores.js"
import {
    dataAgora,
    packPropsEmailCpf,
    saldoSuficiente,
    senhaCorreta,
    verificarNumeroConta,
    verificarOrigemDestino
} from "./intermediarios/intermediarios.js"

export const rotas = express.Router()

rotas.use(dataAgora)

rotas.get('/contas', listarContas)
rotas.post('/contas', packPropsEmailCpf, criarConta)
rotas.put('/contas/:numeroConta/usuario', verificarNumeroConta, packPropsEmailCpf, atualizarConta)
rotas.delete('/contas/:numeroConta', verificarNumeroConta, saldoSuficiente, deletarConta)

rotas.post('/transacoes/depositar', verificarNumeroConta, depositarConta)
rotas.post('/transacoes/sacar', verificarNumeroConta, senhaCorreta, saldoSuficiente, sacarConta)
rotas.post('/transacoes/transferir', verificarOrigemDestino, senhaCorreta, saldoSuficiente, transferirConta)

rotas.get('/contas/saldo', verificarNumeroConta, senhaCorreta, saldoConta)
rotas.get('/contas/extrato', verificarNumeroConta, senhaCorreta, extratoConta)