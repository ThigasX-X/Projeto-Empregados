import * as controller from './empregado.controller.js'

async function empregadoRoutes(server, options) {
    server.get('/empregados', controller.listarEmpregados)
    server.post('/empregados', controller.criarEmpregado)
    server.put('/empregados/:id', controller.atualizarEmpregado)
    server.delete('/empregados/:id', controller.deletarEmpregado)
    server.get ('/empregados/:id', controller.buscarEmpregadoId)
}

export default empregadoRoutes