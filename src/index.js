import express from 'express'
import { rotas } from './rotas.js'

const app = express(), porta = 3000

app.use(express.json())

app.use(rotas)

app.listen(porta, () => console.log('Servidor Inicializado'))