import React, { Component } from 'react'
import api from '../services/api'
import Logo from '../assets/logo.png'
import { Container } from '../components/container'
import { Form } from '../components/form'
import CompareList from '../components/ComperList'

export default class Main extends Component {
  state = {
    repositoryInput: '',
    repositories: [],
  }

  handleAddRepository = async (event) => {
    event.preventDefault()

    try {
      const response = await api.get(`/repos/${this.state.repositoryInput}`)
      this.setState({
        repositoryInput: '',
        repositories: [...this.state.repositories, response.data]
      })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <Container>
        <img src={Logo} alt="Github Compare" />

        <Form onSubmit={this.handleAddRepository}>
          <input
            type="text"
            placeholder="usuário/repositório"
            value={this.state.repositoryInput}
            onChange={event => this.setState({ repositoryInput: event.target.value })}
          />
          <button type="submit">OK</button>
        </Form>

        <CompareList repositories={this.state.repositories} />
      </Container>
    )
  }
}

