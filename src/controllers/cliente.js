const clientes = require("../../dados/clientes.json")
const criar = (req, res) => {

    const dados = req.body
    dados.id = Number(clientes[clientes.length - 1].id) + 1 *//autoIncrement*

    clientes.push(dados)
    res.status(201).json(dados)

}

const listar = (req, res) => {
    res.json(clientes)
}

const alterar = (req, res) => {
    const id = Number(req.params.id)

    const indice = clientes.findIndex(cliente => cliente.id === id)

    if (indice === -1) {
        return res.status(404).json({ mensagem: "Cliente não encontrado" })
    }

    clientes[indice] = {
        ...clientes[indice],
        ...req.body,
        id: id
    }

    res.json(clientes[indice])
}

const excluir = (req, res) => {

    const id = Number(req.params.id)
    const indice = clientes.findIndex(cliente => cliente.id === id)

    if (indice === -1) {
        return res.status(404).json({ mensagem: "Cliente não encontrado" })
    }

    clientes.splice(indice, 1)
    res.status(204).send()
}

module.exports = {
    criar, listar, alterar, excluir
}