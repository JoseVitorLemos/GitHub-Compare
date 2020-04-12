import React, { useState } from 'react'
import Logo from '../assets/logo.png'
import { Container } from '../components/container'
import { Form } from '../components/form'
import CompareList from '../components/ComperList'
import api from '../services/api'

const Main = () => {
  const [state, setState] = useState({
    repositoryInput: '',
    repositories: [],
    mapear: false
  })

  // console.log(state.repositoryInput)
  // console.log(state.mapear)

  const handleAddRepository = async (event) => {
    event.preventDefault()

    try {
      const response = await api.get(`/repos/${state.repositoryInput}`)
      setState({ mapear: true })
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Container>
      <img src={Logo} alt="Github Compare" />

      <Form onSubmit={handleAddRepository}>
        <input
          type="text"
          placeholder="usuário/repositório"
          value={state.repositoryInput}
          onChange={event => setState({ repositoryInput: event.target.value })}
        />
        <button type="submit">OK</button>
      </Form>
      <CompareList repositories={state.repositories} mapear={state.mapear} />
    </Container>
  )
}

export default Main