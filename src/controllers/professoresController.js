
const professoresService = require('../services/professoresService');

const getAllProfessores = async(req, res) => {
    try {
        const professores = await professoresService.getAllProfessores();
        console.log(professores);
        res.status(200).send(professores);
    } catch (err) {
        res.status(500).send(err);
    }
}
const getProfessoresById = async(req, res) => {
    try {
        const professores = await professoresService.getProfessoresById(req.params);
        res.status(200).send(professores);
    } catch (err) {
        res.status(500).send(err);
    }
} 
const persistir = async (req, res) => {
    try {
        const professores = await professoresService.persistirProfessores(req.body);
        res.status(200).send(professores);
    } catch (err) {
        res.status(500).send(err);
    }
}
const deleteProfessores = async (req, res) => {
    try {
        let deletado = await professoresService.deleteProfessores(req.params);
        let response = deletado 
            ? `Registro ${req.params.id} deletado com sucesso` 
            : `Não foi encontrado nenhum registro com o id ${req.params.id} para ser deletado`;
        res.status(200).send({ response });
    } catch (err) {
        res.status(500).send(err);
    }
}
module.exports.getAllProfessores=getAllProfessores;
module.exports.getProfessoresById=getProfessoresById;
module.exports.persistirProfessores=persistir;
module.exports.deleteProfessores=deleteProfessores;



