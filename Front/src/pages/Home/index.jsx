import './style.css'
import Trash from '../../assets/lixo.png'
import Pencil from '../../assets/pencil.svg'
import api from '../../services/api'
import { IMaskInput } from 'react-imask'
import { useEffect, useState, useRef } from 'react'

function Home() {
  const [cpf, setCpf] = useState('')
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
    try {
      await api.post('/empregados', {
        cpf: cpf,
        nome: inputNome.current.value,
        idade: inputIdade.current.value,
        cargo: inputCargo.current.value
      })

      setCpf('');

      inputNome.current.value = '';
      inputIdade.current.value = '';
      inputCargo.current.value = '';
      getEmpregados()

    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert(error.response.data.message);
      } else {
        console.error("Erro ao criar empregado: ", error)
        alert("Ocorreu um erro ao cadastrar. Tente novamente")
      }
    }
  }
  function empregadoEdit(empregado) {
    setCpf(empregado.cpf)

    inputNome.current.value = empregado.nome
    inputIdade.current.value = empregado.idade
    inputCargo.current.value = empregado.cargo

    setIdEmEdicao(empregado.id)
  }

  function empregadoSubmit(event) {
    event.preventDefault();
    if (idEmEdicao) {
      updateEmpregado()
    } else {
      createEmpregado()
    }
  }

  async function updateEmpregado() {
    const dadosAtualizado = {
      cpf: cpf,
      nome: inputNome.current.value,
      idade: inputIdade.current.value,
      cargo: inputCargo.current.value
    }

    await api.put(`/empregados/${idEmEdicao}`, dadosAtualizado)

    setCpf('');
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
      <form onSubmit={empregadoSubmit} >
        <h1>Cadastro dos Empregados</h1>
        <IMaskInput mask="000.000.000-00" value={cpf} onAccept={(value) => setCpf(value)} placeholder="CPF" />
        <input placeholder='Nome' name='Nome' type='text' ref={inputNome} />
        <input placeholder='Idade' idade='Idade' type='number' ref={inputIdade} />
        <input placeholder='Cargo' cargo='Cargo' type='text' ref={inputCargo} />
        <button type='submit'>
          {idEmEdicao ? 'Atualizar' : 'Cadastrar'}
        </button>
      </form>

      {empregados.map(empregado => (
        <div key={empregado.id} className='empregados'>
          <div>
            <p>CPF: <span>{empregado.cpf}</span></p>
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
