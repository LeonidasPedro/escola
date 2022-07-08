
const disciplinasService = require('../services/disciplinasService');

const getAllDisciplinas = async(req, res) => {
    try {
        const disciplinas = await disciplinasService.getAllDisciplinas();
        console.log(disciplinas);
        res.status(200).send(disciplinas);
    } catch (err) {
        res.status(500).send(err);
    }
}
const getDisciplinasById = async(req, res) => {
    try {
        const disciplinas = await disciplinasService.getDisciplinasById(req.params);
        res.status(200).send(disciplinas);
    } catch (err) {
        res.status(500).send(err);
    }
} 
const persistir = async (req, res) => {
    try {
        const disciplinas = await disciplinasService.persistirDisciplinas(req.body);
        res.status(200).send(disciplinas);
    } catch (err) {
        res.status(500).send(err);
    }
}
const deleteDisciplinas = async (req, res) => {
    try {
        let deletado = await disciplinaService.deleteDisciplinas(req.params);
        let response = deletado 
            ? `Registro ${req.params.id} deletado com sucesso` 
            : `Não foi encontrado nenhum registro com o id ${req.params.id} para ser deletado`;
        res.status(200).send({ response });
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports.getAllDisciplinas=getAllDisciplinas;
module.exports.getDisciplinasById=getDisciplinasById;
module.exports.persistirDisciplinas=persistir;
module.exports.deleteDisciplinas=deleteDisciplinas;




