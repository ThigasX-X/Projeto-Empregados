import * as service from './empregado.service.js'

export async function listarEmpregados(request, reply) {
    try {
        const empregado = await service.listarEmpregados(request.query.search)
        reply.send(empregado)
    } catch (error) {
        request.log.error({ msg: 'Erro no controller ao listar empregados', err: error })
        reply.status(error.statusCode || 500).send({ message: error.message || 'Error interno ao buscar dados' })
    }
}

export async function buscarEmpregadoId(request, reply) {
    try {
        const empregadoId = request.params.id
        request.log.info({ msg: 'Buscar empregado por ID - ID recebido: ', id: empregadoId })
        const empregado = await service.buscarId(empregadoId)
        reply.send(empregado)
    } catch (error) {
        request.log.error({ msg: 'Erro no controller ao buscar empregado por ID: ', err: error })
        reply.status(error.statusCode || 500).send({ message: error.message || 'Erro interno ao buscar dados' })
    }
}

export async function criarEmpregado(request, reply) {
    try {
        const novoEmpregado = await service.criarEmpregado(request.body)
        reply.status(201).send(novoEmpregado)
    } catch (error) {
        request.log.error({ msg: 'Erro no controller ao criar empregados', err: error })
        reply.status(error.statusCode || 500).send({ message: error.message || 'Erro interno ao criar dados' })
    }
}

export async function atualizarEmpregado(request, reply) {
    try {
        const empregadoId = request.params.id;
        const dadosEmpregado = request.body

        request.log.info({
            msg: '[CONTROLLER] Atualizar Empregado - Dados recebidos: ',
            paramsId: empregadoId,
            body: dadosEmpregado
        })

        if (!dadosEmpregado || Object.keys(dadosEmpregado).length === 0) {
            return reply.status(400).send({ message: 'Corpo da requisição para atualização está vazio.' })
        }

        const empregadoAtualizado = await service.atualizarEmpregado(empregadoId, dadosEmpregado)
        reply.status(200).send(empregadoAtualizado)
    } catch (error) {
        request.log.error({ msg: 'Erro no controller ai atualizar empregado: ', err: error })
        reply.status(error.statusCode || 500).send({ message: error.message || 'Erro interno ao atualizar dados' })
    }
}

export async function deletarEmpregado(request, reply) {
    try {
        await service.deletarEmpregado(request.params.id);
        reply.status(204).send();
    } catch (error) {
        request.log.error({ msg: 'Erro no controller ao deletar empregado:', err: error });
        reply.status(error.statusCode || 500).send({ message: error.message || 'Erro interno ao deletar dados' });
    }
}
