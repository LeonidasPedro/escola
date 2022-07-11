const controller = require('../controllers/notasController');

module.exports = (app) => {
    app.get('/notas', controller.getAllNotas)
    app.get('/notas/:id', controller.getNotasById)
    app.post('/notas', controller.persistirNotas)
    app.delete('/notas/:id', controller.deleteNotas)
    app.post('/notasMedia', controller.mediaAluno)

};