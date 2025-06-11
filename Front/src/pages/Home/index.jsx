import './style.css'
import api from '../../services/api'
import { IMaskInput } from 'react-imask'
import { FaPencilAlt, FaTrash } from 'react-icons/fa'
import { useEffect, useState, useRef } from 'react'
import ConfirmationModal from '../../components/confirmationModal'

function Home() {
  const [cpf, setCpf] = useState('')
  const [empregados, setEmpragados] = useState([])
  const [idEmEdicao, setIdEmEdicao] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [empregadoParaDeletar, setEmpregadoParaDeletar] = useState(null)

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

      inputNome.current.value = ''
      inputIdade.current.value = ''
      inputCargo.current.value = ''
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

  function cancelarEdit() {
    setIdEmEdicao(null)
    setCpf('')
    inputNome.current.value = ''
    inputIdade.current.value = ''
    inputCargo.current.value = ''
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
    inputNome.current.value = ''
    inputIdade.current.value = ''
    inputCargo.current.value = ''
    setIdEmEdicao(null);
    getEmpregados();

  }

  async function deleteEmpregado(id) {
    try {
      await api.delete(`/empregados/${id}`)
      getEmpregados()
    } catch (error) {
      console.error('Error ao deletar empregado: ', error)
      alert('Não foi possível deletar empregado')
    }
  }

  const OpenDeleteModal = (empregado) => {
    setEmpregadoParaDeletar(empregado)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEmpregadoParaDeletar(null)
  }

  const ConfirmDelete = () => {
    if (empregadoParaDeletar) {
      deleteEmpregado(empregadoParaDeletar.id)
      closeModal()
    }
  }


  useEffect(() => {
    getEmpregados()
  }, [])

  return (
    <>
      <div className='container'>
        <form onSubmit={empregadoSubmit} >
          <h1>
            {idEmEdicao ? 'Atualizar Empregado' : 'Cadastrar Empregado'}
          </h1>
          <IMaskInput mask="000.000.000-00" value={cpf} onAccept={(value) => setCpf(value)} placeholder="CPF" />
          <input placeholder='Nome' name='Nome' type='text' ref={inputNome} />
          <input placeholder='Idade' idade='Idade' type='number' ref={inputIdade} />
          <input placeholder='Cargo' cargo='Cargo' type='text' ref={inputCargo} />

          <div className='form-buttons'>
            <button type='submit'>
              {idEmEdicao ? 'Atualizar' : 'Cadastrar'}
            </button>
            {idEmEdicao && (
              <button type="button" className='cancel-button' onClick={cancelarEdit}>
                Cancelar
              </button>
            )}
          </div>
        </form>

        {empregados.map(empregado => (
          <div key={empregado.id} className='empregados'>
            <div>
              <p>CPF: <span>{empregado.cpf}</span></p>
              <p>Nome: <span>{empregado.nome}</span></p>
              <p>Idade: <span>{empregado.idade}</span></p>
              <p>Cargo: <span>{empregado.cargo}</span></p>
            </div>
            <div className='empregados-actions'>
              <button onClick={() => empregadoEdit(empregado)}>
                <FaPencilAlt />
              </button>
              <button onClick={() => OpenDeleteModal(empregado)}>
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div >
      <ConfirmationModal
        isOpen={isModalOpen}
        message={`Tem certeza que deseja deletar ${empregadoParaDeletar?.nome}?`}
        onClose={closeModal}
        onConfirm={ConfirmDelete}
      />
    </>
  )
}

export default Home
