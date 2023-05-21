var fs = require('fs');
var http = require("http");
var express = require('express');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });

var caneta = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
</svg>`;
var lixo = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
<path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
</svg>`;

var path = require('path');
app.use('/public', express.static(path.join(__dirname, 'public')));

var con = mysql.createConnection({
    host: "localhost",
    user: "root", password: "",
    database: "Loja"
});

con.connect(function (erro) {
    var servidor = app.listen(9080, function () {
        var porta = servidor.address().port;
        console.log("Servidor executando na porta %s", porta);
    });
});

app.get('/', function (req, res) {
    fs.readFile('index.html',
        function (erro, dado) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(dado);
            res.end();

        });
});

app.get('/produtos', function (req, res) {
    fs.readFile('produtos.html',
        function (erro, dado) {
            con.query("SELECT * FROM produtos",
                function (erro, resultado) {
                    if (erro) throw erro;
                    var tabela = "<table class='table table-hover'>" +
                        "<tr class='table-primary'>" +
                        "<td>Operações</td><td>Código</td>" +
                        "<td>Descrição</td>" +
                        "<td>Preço</td></tr>";
                    for (var i = 0; i < resultado.length; i++) {
                        tabela += "<tr><td>" +
                            "<a href='/editar-produtos?cod=" + resultado[i].codigo +
                            "' class='btn btn-primary btn-sm'>" + caneta + "</a> " +
                            "<a href='/apagar-produtos?cod=" +
                            resultado[i].codigo + "' class='btn btn-primary btn-sm'>" + lixo + "</a></td>" +
                            "<td>" + resultado[i].codigo + "</td>" +
                            "<td>" + resultado[i].decricao +
                            "</td>" +
                            "<td align='right'>" +
                            resultado[i].preco.toFixed(2) + "</td>"; "</tr>";
                    }
                    tabela += "</table>";
                    dado = dado.toString().replace(
                        "{{tabela}}", tabela);
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(dado);
                    res.end();
                });
        })
});

app.get('/clientes', function (req, res) {
    fs.readFile('clientes.html',
        function (erro, dado) {
            con.query("SELECT * FROM clientes",
                function (erro, resultado) {
                    if (erro) throw erro;
                    var tabela = "<table class='table table-hover'>" +
                        "<tr class='table-primary'>" +
                        "<td>Operações</td><td>Nome</td>" +
                        "<td>Cpf</td>" +
                        "<td>Telefone</td>" +
                        "<td>Pedido</td></tr>";
                    for (var i = 0; i < resultado.length; i++) {
                        tabela += "<tr><td>" +
                            "<a href='/editar-clientes?cpf=" + resultado[i].cpf+
                            "' class='btn btn-primary btn-sm'>" + caneta + "</a> " +
                            "<a href='/apagar-clientes?cpf=" +
                            resultado[i].cpf+ "' class='btn btn-primary btn-sm'>" + lixo + "</a></td>" +
                            "<td>" + resultado[i].nome+ "</td>" +
                            "<td>" + resultado[i].cpf+ "</td>" +
                            "<td>" + resultado[i].telefone+ "</td>" +
                            "<td align='right'>" +
                            resultado[i].pedido+ "</td>"; "</tr>";
                    }
                    tabela += "</table>";
                    dado = dado.toString().replace(
                        "{{tabela}}", tabela);
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(dado);
                    res.end();

                });
        });
});

app.get('/novo-produto', function (req, res) {
    fs.readFile('novo-produto.html',
        function (erro, dado) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(dado);
            res.end();

        });
});

app.get('/novo-cliente', function (req, res) {
    fs.readFile('novo-cliente.html',
        function (erro, dado) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(dado);
            res.end();

        });
});