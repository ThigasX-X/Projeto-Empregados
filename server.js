import Fastify from 'fastify';
import mysql from 'mysql2/promise';

const PORT = 3232;
const HOST = '0.0.0.0';


const server = Fastify({
    logger: true
});


const pool = mysql.createPool({
    host: process.env.DB_HOST || 'meu-mysql-db',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'sua_senha_mysql_aqui',
    database: process.env.DB_NAME || 'projeto-node',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


async function testDbConnection() {
    try {
        const connection = await pool.getConnection();
        server.log.info('Conexão com o MySQL (pool) bem-sucedida!');
        connection.release();
    } catch (error) {
        server.log.error('Erro ao conectar com o MySQL:', error);
    }
}

server.get('/empregados', async (request, reply) => {
    try {
        const search = request.query.search;
        let query = 'SELECT * FROM tabela_empregados';
        const queryParams = [];

        if (search) {
            query += ' WHERE nome LIKE ?';
            queryParams.push(`%${search}%`);
        }

        const [empregados] = await pool.query(query, queryParams);
        return empregados;
    } catch (error) {
        server.log.error('Erro ao buscar empregados:', error);
        reply.status(500).send({ message: 'Erro ao buscar dados' });
    }
});

server.post('/empregados', async (request, reply) => {
    try {
        const { nome, idade, cargo } = request.body;
        if (!nome || !idade || !cargo) {
            return reply.status(400).send({ message: 'Nome, idade e cargo são obrigatórios.' });
        }
        const [result] = await pool.query(
            'INSERT INTO tabela_empregados (nome, idade, cargo) VALUES (?, ?, ?)',
            [nome, idade, cargo]
        );
        return reply.status(201).send({ id: result.insertId, nome, idade, cargo });
    } catch (error) {
        server.log.error('Erro ao criar empregado:', error);
        reply.status(500).send({ message: 'Erro ao criar dados' });
    }
});

server.put('/empregados/:id', async (request, reply) => {
    try {
        const empregadoId = request.params.id;
        const { nome, idade, cargo } = request.body;
        if (!nome || !idade || !cargo) {
            return reply.status(400).send({ message: 'Nome, idade e cargo são obrigatórios.' });
        }
        const [result] = await pool.query(
            'UPDATE tabela_empregados SET nome = ?, idade = ?, cargo = ? WHERE id = ?',
        );

        if (result.affectedRows === 0) {
            return reply.status(404).send({ message: 'Empregado não encontrado' });
        }
        return reply.status(200).send({ message: 'Empregado atualizado' });
    } catch (error) {
        server.log.error('Erro ao atualizar empregado:', error);
        reply.status(500).send({ message: 'Erro ao atualizar dados' });
    }
});

server.delete('/empregados/:id', async (request, reply) => {
    try {
        const empregadoId = request.params.id;
        const [result] = await pool.query(
            'DELETE FROM tabela_empregados WHERE id = ?',
            [empregadoId]
        );

        if (result.affectedRows === 0) {
            return reply.status(404).send({ message: 'Empregado não encontrado' });
        }
        return reply.status(204).send();
    } catch (error) {
        server.log.error('Erro ao deletar empregado:', error);
        reply.status(500).send({ message: 'Erro ao deletar dados' });
    }
});

async function startServer() {
    await testDbConnection();
    try {
        await server.listen({ port: PORT, host: HOST });
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
}

startServer();