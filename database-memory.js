import { randomUUID } from "crypto"

export class DataBaseMemory {
    #empregados = new Map()

    create(empregado){
        const empregadoId = randomUUID()
        this.#empregados.set(empregadoId, empregado)
    }

    list(search){
        return Array.from(this.#empregados.entries()).map((empregadoArray) => {
            const id = empregadoArray[0]
            const data = empregadoArray[1]

            return {
                id, ...data
            }
        })
        .filter(empregados => {
            if(search){
                return empregados.cargo.includes(search)
            }
            return true
        })
    }

    update(id, empregados){
        this.#empregados.set(id, empregados)
    }

    delete(id){
        this.#empregados.delete(id)
    }
}