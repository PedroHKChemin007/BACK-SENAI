const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const cors = require('cors')
const bcrypt = require('bcrypt')

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




app.post('/', async (req, res) => {
    res.json({
        'teste': 'ok'
    })
})




//Cadastro usuario
app.post('/usuarios', async (req, res) =>{

    console.log(req.body);

    let nome = req.body.nome
    let email = req.body.email
    let senha = req.body.senha

    let senhahash = await bcrypt.hash(senha, 10)
    console.log(senhahash);

//inserir no banco de dados
db.run(`INSERT INTO usuario (nome, email, senha)
VALUES (?, ?, ?)`,
    [nome, email, senhahash],
    res.json({
        id: this.lastID,
        nome,
        email
        })
    )
})

//selecionar um usuario
app.get('usuarios/:id', (req,res) => {
    let idUsuario = req.paramas.id;

    db.get(`SELECT id, nome, email FROM usuarios 
    WHERE id = ?`,
    [idUsuario], (err, row) => {
        if (row) {
            res.json(row)
        } else{
            res.status(404).json({
                'message' : 'Usuario não encontrado.'
            })
        }
    })
})

//deletar usuarios
app.delete('usuarios/:id', (req, res) =>{
    let idUsuario = req.params.id

    db.get(`DELETE FROM usuarios WHERE id = ?`,
    [idUsuario], function(err, result) {
        if (result) {
            res.json({
            'masage' : 'Usuario deletado'
        })
        } else{
            res.status(404).json({
                'masage' : 'Usuario não encontrado'
            })
        }
        
    })
    
})

//listar todos os usuarios

app.get("/usuarios",(req, res) =>{
    db.all(`SELECT id, nome, email FROM usuarios`, [], (err, rows)=>{
        res.json(rows)
    })
})

//Iniciar o server
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));