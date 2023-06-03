var fs = require('fs');
var http = require("http");
var express = require('express');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser =
bodyParser.urlencoded({ extended: true });

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "loja"
}
);

app.get('/novo-cliente',
    function (req, res) {
        fs.readFile('novo-cliente.html',
            function (erro, dado) {
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                res.write(dado);
                res.end();
            }
        );
    });
app.post('/inserir_cliente', urlencodedParser,
    function (req, res) {
        var cmd = "INSERT INTO cliente (nome, cpf, telefone, pedido) VALUES (?, ?, ?, ?)";
        var dados = [req.body.nome, req.body.cpf, req.body.telefone, req.body.pedido];
        con.query(cmd, dados, function (erro) {
            if (erro) throw erro;
            res.redirect('/cliente ');
        });
    });