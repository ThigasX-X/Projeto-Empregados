import pool from "../../config/database.js"

const tabela_empregados = 'tabela_empregados'

export async function searchAll(searchAll) {
    let query = `SELECT id, cpf, nome, idade, cargo FROM ${tabela_empregados}`
    const queryParams = []
    if (searchAll) {
        query += ` WHERE nome LIKE ?`
        queryParams.push(`${searchAll}`)
    }
    const [rows] = await pool.query(query, queryParams)
    return rows
}

export async function searchById(id) {
    const [rows] = await pool.query(`SELECT id, cpf, nome, idade, cargo FROM ${tabela_empregados} WHERE id = ?`, [id])
    return rows
}

export  async function findByCpf(cpf) {
    const [rows] = await pool.query(`SELECT * FROM ${tabela_empregados} WHERE cpf = ?`, [cpf])
    return rows[0]
}

export async function create(dadosEmpregado) {
    const { cpf, nome, idade, cargo } = dadosEmpregado
    const [result] = await pool.query(`INSERT INTO ${tabela_empregados} (cpf, nome, idade, cargo) VALUES (?, ?, ?, ?)`, [cpf, nome, idade, cargo])
    return { id: result.insertId, ...dadosEmpregado }
}

export async function update(id, dadosEmpregado) {
    const { cpf, nome, idade, cargo } = dadosEmpregado
    const [result] = await pool.query(`UPDATE ${tabela_empregados} SET cpf = ?, nome = ?, idade = ?, cargo = ? WHERE id = ?`, [cpf, nome, idade, cargo, id])
    return result.affectedRows > 0
}

export async function deleteById(id) {
    const [result] = await pool.query(`DELETE FROM ${tabela_empregados} WHERE id = ?`, [id])
    return result.affectedRows > 0
}
