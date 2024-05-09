const express = require('express')
const mysql = require('mysql')

const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const connection = mysql.createConnection(config)

const createSql = `CREATE TABLE IF NOT EXISTS people (id int NOT NULL AUTO_INCREMENT, name varchar(255), PRIMARY KEY (id));`

connection.query(createSql)
connection.end()

app.get('/', (req,res) => {
    const requestConnection = mysql.createConnection(config)
    requestConnection.query(`INSERT INTO people (name) values ('Edilson')`)
    requestConnection.query(`SELECT name FROM people`, (err, rows, fields) => {
        if (err) throw err
        const names = rows.flatMap((row) => row.name).join(', ')

        res.send(`<h1>Full Cycle Rocks!</h1><br>- ${names}`)
    })
    requestConnection.end()
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})