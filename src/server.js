import fastify from "fastify";
import pool from "./config/database.js";
import empregadoRoutes from './modules/empregados/empregado.routes.js'

const PORT = process.env.PORT || 3232
const HOST = '0.0.0.0'

const server = fastify({
    logger: true
})

async function testDbConnection() {
    let connection
    try {
        const connection = await pool.getConnection()
        server.log.info('Conexão com o MySQL (pool) bem-sucedida a partid do server.js!')

    } catch (error) {
        server.log.error({ msg: 'Erro ao conectar com o MySQL a partir do server.js: ', err: error })
    } finally {
        if (connection) {
            try {
                await connection.release()
                server.log.info('Conexão com MySQL liberada.')
            } catch (releaseError) {
                server.log.error({ msg: 'Erro ao liberar conexão com MySQL:', err: releaseError })
            }
        }
    }
}
server.register(empregadoRoutes)

server.get('/', async (request, reply) => {
    return { status: 'API está funcionando! ' }
})

async function start() {
    try {
        await testDbConnection()
        await server.listen({ port: PORT, host: HOST })
    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}

start()