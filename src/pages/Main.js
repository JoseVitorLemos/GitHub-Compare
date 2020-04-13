import React, { Component } from 'react'
import moment from 'moment'
import api from '../services/api'
import Logo from './logo.png'
import { Container } from '../components/container'
import { Form } from '../components/form'
import CompareList from '../components/ComperList'

export default class Main extends Component {
  state = {
    repositoryInput: '',
    repositories: [],
    repositoryError: false,
    isLoading: false
  }

  handleAddRepository = async (event) => {
    event.preventDefault()

    this.setState({ isLoading: true })

    try {
      const { data: repository } = await api.get(`/repos/${this.state.repositoryInput}`)

      repository.lastCommit = moment(repository.pushed_at).fromNow() //Atribuiu uma variável chamada lastCommit recebendo uma data formatada usando a biblioteca momment

      this.setState({
        repositoryInput: '',
        repositories: [...this.state.repositories, repository],
        repositoryError: false
      })
    } catch (err) {
      this.setState({ repositoryError: true })
    } finally {
      this.setState({ isLoading: false })
    }
  }

  render() {
    return (
      <Container>
        <img src={Logo} alt="Github Compare" />

        <Form withError={this.state.repositoryError} onSubmit={this.handleAddRepository}>
          <input
            type="text"
            placeholder="usuário/repositório"
            value={this.state.repositoryInput}
            onChange={event => this.setState({ repositoryInput: event.target.value })}
          />
          <button type="submit">{this.state.isLoading ? <i className="fa fa-spinner fa-pulse" /> : 'OK'}</button>
        </Form>

        <CompareList repositories={this.state.repositories} />
      </Container>
    )
  }
}

