
const alunosService = require('../services/alunosService');

const getAllAlunos = async(req, res) => {
    try {
        const alunos = await alunosService.getAllAlunos();
        console.log(alunos);
        res.status(200).send(alunos);
    } catch (err) {
        res.status(500).send(err);
    }
}
const getAlunosById = async(req, res) => {
    try {
        const alunos = await alunosService.getAlunosById(req.params);
        res.status(200).send(alunos);
    } catch (err) {
        res.status(500).send(err);
    }
} 
const persistir = async (req, res) => {
    try {
        const alunos = await alunosService.persistirAlunos(req.body);
        res.status(200).send(alunos);
    } catch (err) {
        res.status(500).send(err);
    }
}
const deleteAlunos = async (req, res) => {
    try {
        let deletado = await alunosService.deleteAlunos(req.params);
        let response = deletado 
            ? `Registro ${req.params.id} deletado com sucesso` 
            : `Não foi encontrado nenhum registro com o id ${req.params.id} para ser deletado`;
        res.status(200).send({ response });
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports.getAllAlunos=getAllAlunos;
module.exports.getAlunosById=getAlunosById;
module.exports.persistirAlunos=persistir;
module.exports.deleteAlunos=deleteAlunos;




