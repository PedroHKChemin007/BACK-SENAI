const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const cors = require('corps')
const bcrypt = require('bcrypt')
const { log } = require('console')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

//Criar banco sqlite e tabela
const db = new sqlite3.Database('./Database.db')

//Criar tabela usuarios
db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    email TEXT,
    senha TEXT
    )
`)
//Cadastro usuario
app.post('/usuarios', async (req, res) =>{

    console.log(req.body);

    let nome = req.body.nome
    let email = req.body.email
    let senha = req.body.semha

    let senhahash = await bcrypt.hash(senha, 10)
    console.log(senhahash);

//inserir no banco de dados
db.run(`INSERT INTO usuario (nome, email, senha)
VALUES (?, ?, ?)`,
    [nome, email, senhahash],
    res.json({
        id: this.lasID,
        nome,
        email
        })
    )
})