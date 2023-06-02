var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "loja"
}
);

app.get('/novo-produto',
    function (req, res) {
        fs.readFile('novo-produto.html',
            function (erro, dado) {
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                res.write(dado);
                res.end();
            }
        );
    });
app.post('/incluir-produto', urlencodedParser,
    function (req, res) {
        var cmd = "INSERT INTO produto (codigo, descricao, preco) VALUES (?, ?, ?)";
        var dados = [req.body.codigo, req.body.descricao, req.body.preco];
        con.query(cmd, dados, function (erro) {
            if (erro) throw erro;
            res.redirect('/produtos');
        });
    });