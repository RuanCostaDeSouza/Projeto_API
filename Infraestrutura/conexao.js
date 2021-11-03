const mysql = require('mysql2')

const conexao = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password:'Dolly3000',
    database:'petshop',
})
module.exports = conexao