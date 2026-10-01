const pedidos = require("../../dados/pedidos.json")
function subotais() {

    pedidos.forEach(p => {
        p.subtotal = p.quantidade * p.preco

    })

}

const criar = (req, res) => {
    const dados = req.body
    dados.id = Number(pedidos[pedidos.length - 1].id) + 1 //autoIncrement
    pedidos.push(dados)

    res.status(201).json(dados)

}

const listar = (req, res) => {
    subtotais()
    
    res.json(pedidos)

}

const alterar = (req, res)=>{
    const id = req.params.id;
    const dados = req.body;
    let status = 0;

    pedidos.forEach((pedido) => {
        if(pedido.id == id) {
            status = 1;
            pedido.id = dados.id;
            pedido.cliente_id = dados.cliente_id;
            pedido.produto = dados.produto;
            pedido.preco = dados.preco;
            pedido.quantidade = dados.quantidade;
        }
    });

    if(status == 1){
        res.send("Pedido alterado com sucesso !");
    }else {
        res.status(404).send("Pedido não encontrado");
    }}
const excluir = (req, res)=>{
    const id = req.params.id;
let status = 0;

pedidos.forEach((pedido, indice) => {
    if(pedido.id == id){
        status = 1;
    pedidos.splice(indice, 1);
    }
});

if(status == 1){
    res.send("Pedido excluido com sucesso");
}else{
    res.status(404).send("Pedido não encontrado");
}
}

module.exports = {
    criar, listar, alterar, excluir
}