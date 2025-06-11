import * as repository from './empregado.repository.js'

export async function listarEmpregados(searchAll) {
    return await repository.searchAll(searchAll)
}

export async function buscarId(id) {
    const empregado = await repository.searchById(id)
    if (!empregado) {
        const error = new Error('Id inexistente!')
        throw error
    }
    return empregado
}

export async function criarEmpregado(dadosEmpregado) {
    const { cpf, nome, idade, cargo } = dadosEmpregado

    const empregadoExistente = await repository.findByCpf(cpf)
    if (empregadoExistente) {
        const error = new Error('CPF já cadastrado no sistema.')
        error.statusCode = 409
        throw error;
    }
    
    if (!cpf || !nome || idade === undefined || !cargo) {
        const error = new Error('CPF , nome, idade e cargo são obrigatórios.')
        error.statusCode = 400
        throw error
    }
    return await repository.create(dadosEmpregado)
}

export async function atualizarEmpregado(id, dadosEmpregado) {
    const { nome, idade, cargo } = dadosEmpregado
    if (!nome || idade === undefined || !cargo) {
        const error = new Error('Nome, idade e cargo são obrigatórios para atualização.')
        error.statusCode = 400
        throw error
    }
    const atualizado = await repository.update(id, dadosEmpregado)
    if (!atualizado) {
        const error = new Error('Empregado não encontrado para atualização.')
        error.statusCode = 404
        throw error
    }
    return { id, ...dadosEmpregado }
}

export async function deletarEmpregado(id) {
    const deletado = await repository.deleteById(id)
    if (!deletado) {
        const error = new Error('Empregado não encontrado para deleção')
        error.statusCode = 404
        throw error
    }
    return true
}