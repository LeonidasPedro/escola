
const notasService = require('../services/notasService');

const getAllNotas = async(req, res) => {
    try {
        const notas = await notasService.getAllNotas();
        console.log(notas);
        res.status(200).send(notas);
    } catch (err) {
        res.status(500).send(err);
    }
}
const getNotasById = async(req, res) => {
    try {
        const notas = await notasService.getNotasById(req.params);
        res.status(200).send(notas);
    } catch (err) {
        res.status(500).send(err);
    }
} 
const persistir = async (req, res) => {
    try {
        //console.log(req.body);
        const notas = await notasService.persistirNotas(req.body);
        res.status(200).send(notas);
    } catch (err) {
        res.status(500).send(err);
    }
}
const mediaAluno = async (req, res) =>{
    try {   
        const mediaAluno = await notasService.mediaAluno(req.body);
        //console.log(mediaAluno);
        res.status(200).send(mediaAluno);}
    catch (err) { 
        res.status(500).send(err);
    }
}
const allMediaAlunos = async (req, res) =>{
    try {   
        
        const media = await notasService.allMediaAlunos(req.body);
        //console.log(mediaAluno);
        res.status(200).send(media);}
    catch (err) { 
        res.status(500).send(err);
    }
}

const deleteNotas = async (req, res) => {
    try {
        let deletado = await notasService.deleteNotas(req.params);
        let response = deletado 
            ? `Registro ${req.params.id} deletado com sucesso` 
            : `Não foi encontrado nenhum registro com o id ${req.params.id} para ser deletado`;
        res.status(200).send({ response });
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports.getAllNotas=getAllNotas;
module.exports.getNotasById=getNotasById;
module.exports.persistirNotas=persistir;
module.exports.deleteNotas=deleteNotas;
module.exports.mediaAluno = mediaAluno;
module.exports.allMediaAlunos=allMediaAlunos;




