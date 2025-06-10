import './style.css'
import Trash from '../../assets/lixo.png'
import Pencil from '../../assets/pencil.svg'
import api from '../../services/api'
import { useEffect, useState, useRef } from 'react'

function Home() {
  const [empregados, setEmpragados] = useState([])
  const [idEmEdicao, setIdEmEdicao] = useState(null)

  const inputNome = useRef()
  const inputIdade = useRef()
  const inputCargo = useRef()


  async function getEmpregados() {
    const empregadosFromApi = await api.get('/empregados')
    setEmpragados(empregadosFromApi.data)
  }

  async function createEmpregado() {
    await api.post('/empregados', {
      nome: inputNome.current.value,
      idade: inputIdade.current.value,
      cargo: inputCargo.current.value
    })
    getEmpregados()
  }

  function empregadoEdit(empregado) {
    inputNome.current.value = empregado.nome
    inputIdade.current.value = empregado.idade
    inputCargo.current.value = empregado.cargo

    setIdEmEdicao(empregado.id)
  }

  function empregadoSubmit() {
    if (idEmEdicao) {
      updateEmpregado()
    } else {
      createEmpregado()
    }
  }

  async function updateEmpregado() {
    const dadosAtualizado = {
      nome: inputNome.current.value,
      idade: inputIdade.current.value,
      cargo: inputCargo.current.value
    }

    await api.put(`/empregados/${idEmEdicao}`, dadosAtualizado)

    inputNome.current.value = '';
    inputIdade.current.value = '';
    inputCargo.current.value = '';
    setIdEmEdicao(null);
    getEmpregados();

  }

  async function deleteEmpregado(id) {
    await api.delete(`/empregados/${id}`)
    getEmpregados()
  }

  useEffect(() => {
    getEmpregados()
  }, [])

  return (
    <div className='container'>
      <form>
        <h1>Cadastro dos Empregados</h1>
        <input placeholder='Nome' name='Nome' type='text' ref={inputNome} />
        <input placeholder='Idade' idade='Idade' type='number' ref={inputIdade} />
        <input placeholder='Cargo' cargo='Cargo' type='text' ref={inputCargo} />
        <button type='button' onClick={empregadoSubmit}>
          {idEmEdicao ? 'Atualizar' : 'Cadastrar'}
        </button>
      </form>

      {empregados.map(empregado => (
        <div key={empregado.id} className='empregados'>
          <div>
            <p>Nome: <span>{empregado.nome}</span></p>
            <p>Idade: <span>{empregado.idade}</span></p>
            <p>Cargo: <span>{empregado.cargo}</span></p>
          </div>
          <div className='empregado-actions'>
            <button onClick={() => empregadoEdit(empregado)}>
              <img src={Pencil} alt='Editar' />
            </button>
            <button onClick={() => deleteEmpregado(empregado.id)}>
              <img src={Trash} alt='Deletar' />
            </button>
          </div>
        </div>
      ))}
    </div>

  )
}

export default Home
