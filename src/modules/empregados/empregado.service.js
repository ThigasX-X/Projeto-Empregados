import * as repository from './empregado.repository.js'

export function listarEmpregados(searchAll) {
    return repository.searchAll(searchAll)
}

export function buscarId(id) {
    const empregado = repository.searchById(id)
    if (!empregado) {
        const error = new Error('Id inexistente!')
    }
    return empregado
}

export function criarEmpregado(dadosEmpregado) {
    const { nome, idade, cargo } = dadosEmpregado
    if (!nome || idade === undefined || !cargo) {
        const error = new Error('Nome, idade e cargo são obrigatórios.')
        error.statusCode = 400
        throw error
    }
    return repository.create(dadosEmpregado)
}

export function atualizarEmpregado(id, dadosEmpregado) {
    const { nome, idade, cargo } = dadosEmpregado
    if (!nome || idade === undefined || !cargo) {
        const error = new Error('Nome, idade e cargo são obrigatórios para atualização.')
        error.statusCode = 400
        throw error
    }
    const atualizado = repository.update(id, dadosEmpregado)
    if (!atualizado) {
        const error = new Error('Empregado não encontrado para atualização.')
        error.statusCode = 404
        throw error
    }
    return { id, ...dadosEmpregado }
}

export function deletarEmpregado(id) {
    const deletado = repository.deleteById(id)
    if (!deletado) {
        const error = new Error('Empregado não encontrado para deleção')
        error.statusCode = 404
        throw error
    }
    return true
}