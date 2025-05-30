import * as service from './empregado.service.js'

export function listarEmpregados(request, reply) {
    try {
        const empregado = service.listarEmpregados(request.query.search)
        reply.send(empregado)
    } catch (error) {
        request.log.error({ msg: 'Erro no controller ao listar empregados', err: error })
        reply.status(error.statusCode || 500).send({ message: error.message || 'Error interno ao buscar dados' })
    }
}

export function criarEmpregado(request, reply) {
    try {
        const novoEmpregado = service.criarEmpregado(request.body)
        reply.status(201).send(novoEmpregado)
    } catch {
        request.log.error({ msg: 'Erro no controller ao criar empregados', err: error })
        reply.status(error.statusCode || 500).send({ message: error.message || 'Erro interno ao criar dados' })
    }
}

export function atualizarEmpregado(request, reply) {
    try {
        service.deletarExistente(request.params.id)
        reply.status(204).send()
    } catch (error) {
        request.log.error({ msg: 'Erro no controller ao deletar empregados', err: error })
        reply.status(error.statusCode || 500).send({ message: error.message || 'Erro interno ao deletar dados' })
    }
}

export function deletarEmpregado(request, reply) {
  try {
    service.deletarEmpregado(request.params.id);
    reply.status(204).send();
  } catch (error) {
    request.log.error({ msg: 'Erro no controller ao deletar empregado:', err: error });
    reply.status(error.statusCode || 500).send({ message: error.message || 'Erro interno ao deletar dados' });
  }
}