import React, { Component } from 'react'
import axios from 'axios'
//import Autocomplete from 'react-autocomplete'
import Suggestions from './Suggestions'

export class SearchData extends Component {
  state = {
    query: '',
    results: []
  }

  getExercise = () => {
    axios.get(`/api/search/exercises?=${this.state.query}`).then(resp => {
      this.setState({ results: resp.data })
      console.log(resp.data)
    })
  }
  inputQueryHandler = () => {
    this.setState(
      {
        query: this.search.value
      },
      () => {
        if (this.state.query && this.state.query.length > 1) {
          if (this.state.query.length % 2 === 0) {
            this.getExercise()
          }
        }
      }
    )
  }
  render() {
    return (
      <form>
        <input
          placeholder="Search for...."
          ref={input => (this.search = input)}
          onChange={this.inputQueryHandler}
        />
        <Suggestions results={this.state.results} />
      </form>
    )
  }
}
export default SearchData
