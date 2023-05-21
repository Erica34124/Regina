var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Loja'
});

con.connect(
    function(erro) {
        if (erro) throw erro;
        var cmd = "INSERT INTO produtos (codigo, decricao, preco) VALUES (?, ?, ?)";
        var dados = [16, 'Carro', 25000];
        con.query(cmd, dados, function (erro) {
            if (erro) throw erro;
            console.log("Inserido!");
            con.end();
        });
    });

var produto = { 
    codigo: 10, descricao: "Televisor", preco: 1990.00 };
    console.log("Dados do produto: ");
    console.log("Código: " + produto.codigo);
    console.log("Descrição: " + produto.descricao);
    console.log("Preço: " + produto.preco);

function hoje() {
    var agora = new Date();
    return (agora.getDate() + "/" + 
    (agora.getMonth() + 1) + "/" + agora.getFullYear());
}

var produto = { 
    codigo: 10, descricao: "Televisor", preco: 1990.00, data: function () { 
        return hoje(); } };
        console.log("Dados do produto: ");
        console.log("Código: " + produto.codigo);
        console.log("Descrição: " + produto.descricao);
        console.log("Preço: " + produto.preco);
        console.log("Data Cadastro: " + produto.data());

        var produtos = [];
        function inserir() {produtos.push({codigo: parseInt(cod.value), descricao: desc.value, preco: parseFloat(prec.value)});
        mostrar();
    }
    function remover(i) {produtos.splice(i, 1);
        mostrar();
    }
    function mostrar() {
        console.log(JSON.stringify(produtos));
        var conteudo = "<table cellspacing='0' cellpadding='4' border='1'>" +"<tr><td>Código</td>" + "<td>Descrição</td>" + "<td>Preço</td></tr>";
        for (var i in produtos) {
            conteudo+= "<tr><td><button onclick='remover(" + i + ")'><image src='deletar.png' height='12px'></button> " + produtos[i].codigo + 
            "</td><td> " + produtos[i].descricao + "</td><td align='right'>" + produtos[i].preco.toFixed(2) + "</td></tr>";
        }
        conteudo += "</table>";
        tabela.innerHTML = conteudo;
    }       