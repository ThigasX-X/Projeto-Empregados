import pool from "../../config/database.js"

const tabela_empregados = 'tabela_empregados'

export function searchAll(searchAll) {
    let query = 'SELECT id, nome, idade, cargo FROM ${tabela_empregados}'
    const queryParams = []
    if (searchAll) {
        query += 'WHERE nome LIKE ?'
        queryParams.push('${searchAll}')
    }
    const [rows] = pool.query(query, queryParams)
    return rows
}

export function searchById(id) {
    const [rows] = pool.query('SELECT id, nome, cargo FROM ${tabela_empregados} WHERE id = ?', [id])
    return rows
}

export function create(dadosEmpregado) {
    const { id, nome, idade, cargo } = dadosEmpregado
    const [result] = pool.query('INSERT INTO ${tabela_empregados} (nome, idade, cargo) VALUES (?, ?, ?)', [nome, idade, cargo])
    return { id: result.insertId, ...dadosEmpregado }
}

export function update(id, dadosEmpregado) {
    const { nome, idade, cargo } = dadosEmpregado
    const [result] = pool.query('UPDATE ${tabela_empregados} SET nome = ?, idade = ?, cargo = ? WHERE id = ?', [nome, idade, cargo, id])
    return result.affectedRows > 0
}

export function deleteById(id) {
    const [result] = pool.query('DELETE FROM ${tabela_empregados} WHERE id = ?', [id])
    return result.affectedRows > 0
}
