import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import moment from 'moment'

const Form = styled('form')`
  grid-area: Search;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  margin: 0 -10px -10px;

  input {
    flex-grow: 1;
    min-width: 200px;
    margin: 0 10px 10px;
    padding: 12px 28px 11px 15px;
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    font-size: 18px;
    color: var(--color-dafault);
    outline: none;
    transition: all 0.2s ease;

    ::placeholder {
      font-size: 18px;
      color: var(--color-primary);
    }

    :hover {
      border-color: var(--color-border);
    }

    :focus {
      border-color: var(--color-border-hover);
    }
  }

  button {
    flex-shrink: 0;
    margin: 0 10px;
    padding: 12px 23px 13px;
    font-size: 18px;
    font-weight: 300;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: var(--font);
    color: var(--color-white);
    background-color: var(--color-primary-3);

    :hover,
    :focus {
      background-color: var(--color-primary-2);
    }
  }
`

class Search extends Component {
  static propTypes = {
    loadCityNow: PropTypes.func.isRequired,
    searchText: PropTypes.func.isRequired
  }

  state = {
    text: ''
  }

  formSubmit = ev => {
    ev.preventDefault()
    const {loadCityNow, searchText} = this.props
    const {text} = this.state

    loadCityNow(text)
    if (!text) searchText('Nothing to geocode', moment())
    else searchText(text, moment())
  }

  handleSubmit = ev => {
    ev.preventDefault()

    this.setState({
      text: ev.target.value
    })
  }

  render () {
    return (
      <Form onSubmit={this.formSubmit}>
        <input
          type='text'
          value={this.state.text}
          placeholder='Search city'
          onChange={this.handleSubmit} />
        <button type='submit' >Search</button>
      </Form>
    )
  }
}

export default Search
