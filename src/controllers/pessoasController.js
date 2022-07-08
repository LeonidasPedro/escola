
const pessoasService = require('../services/pessoasService');

const getAllPessoas = async(req, res) => {
    try {
        const pessoas = await pessoasService.getAllPessoas();
        console.log(pessoas);
        res.status(200).send(pessoas);
    } catch (err) {
        res.status(500).send(err);
    }
}
const getPessoasById = async(req, res) => {
    try {
        const pessoas = await pessoasService.getPessoasById(req.params);
        res.status(200).send(pessoas);
    } catch (err) {
        res.status(500).send(err);
    }
} 
const persistir = async (req, res) => {
    try {
        const pessoas = await pessoasService.persistirPessoas(req.body);
        res.status(200).send(pessoas);
    } catch (err) {
        res.status(500).send(err);
    }
}
const deletePessoas = async (req, res) => {
    try {
        
        let deletado = await pessoasService.deletePessoas(req.params);
        
        let response = deletado 
            ? `Registro ${req.params.id} deletado com sucesso` 
            : `Não foi encontrado nenhum registro com o id ${req.params.id} para ser deletado`;
        res.status(200).send({ response });
    } catch (err) {
        res.status(500).send(err);
    }
}
module.exports.getAllPessoas = getAllPessoas;
module.exports.getPessoasById = getPessoasById;
module.exports.persistirPessoas = persistir;
module.exports.deletePessoas = deletePessoas;