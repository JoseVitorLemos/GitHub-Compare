import React from 'react'
import Logo from '../assets/logo.png'
import { Container } from '../components/container'
import { Form } from '../components/form'
import CompareList from '../components/ComperList'

const Main = () => (
  <Container>
    <img src={Logo} alt="Github Compare" />
    <Form>
      <input type="text" placeholder="usuário/repositório" />
      <button type="submit">OK</button>
    </Form>

    <CompareList />
  </Container>

)

export default Main