import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import './styles.css'

import api from './Services/api'

function App() {
  const [input, setInput] = useState('')
  const [cep, setCep] = useState('')

  async function handleSearch() {
    if (input === '') {
      alert('Insira um CEP válido!')
      return
    }

    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput('')
    } catch {
      alert('Ops! Parece que algo deu errado...')
      setInput('')
    }
  }

  document.onkeydown = enter
  function enter(e) {
    if (e.keyCode === 13) handleSearch()
  }

  return (
    <div className="App">
      <div className="container">
        <div className="icons">
          <a
            href="https://github.com/leo-serrao"
            target={'_blank'}
            rel="noreferrer"
          >
            <FaGithub className="icon" size={35} color="#fff" />
          </a>

          <a
            href="https://www.linkedin.com/in/leonardo-serrão-171332104/"
            target={'_blank'}
            rel="noreferrer"
          >
            <FaLinkedin className="icon" size={35} color="#fff " />
          </a>
        </div>

        <h1 className="title">Buscador de CEP</h1>

        <div className="container-input">
          <input
            type="text"
            placeholder="Digite seu CEP ..."
            value={input}
            onChange={e => setInput(e.target.value)}
          />

          <button className="buttonSearch" onClick={handleSearch}>
            <FiSearch size={25} color="#fff" />
          </button>
        </div>

        {Object.keys(cep).length > 0 && (
          <main className="main">
            <h2>CEP: {cep.cep}</h2>

            <span>
              <strong>Logradouro:</strong> {cep.logradouro}
            </span>
            <span>Complemento: {cep.complemento}</span>
            <span>Bairro: {cep.bairro}</span>
            <span>
              Cidade: {cep.localidade} - {cep.uf}
            </span>
          </main>
        )}
      </div>
    </div>
  )
}

export default App
