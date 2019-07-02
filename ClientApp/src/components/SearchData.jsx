import React, { Component } from 'react'
import axios from 'axios'
import Autocomplete from 'react-autocomplete'

export class SearchData extends Component {
  state = {
    query: '',
    value: '',
    searchTerm: '',
    results: []
  }

  getExercise = () => {
    axios.get(`/api/search/exercises?=${this.state.query}`).then(resp => {
      this.setState({ results: resp.data })
      console.log(resp.data)
    })
  }
  getExercisesForAutoComplete(value, callback) {
    axios.get(`/api/search/exercises?=${value}`).then(resp => {
      callback(resp.data)
    })
  }
  render() {
    return (
      <form>
        <Autocomplete
          value={this.state.value}
          items={this.state.results}
          getItemValue={item => item.name}
          onSelect={value => this.setState({ value })}
          onChange={(event, value) => {
            this.setState({ value })
            clearTimeout(this.requestTimer)
            console.log({ value })
            this.requestTimer = this.getExercisesForAutoComplete(
              value,
              searchResults => {
                console.log('cb', { searchResults })
                this.setState({ results: searchResults })
              }
            )
          }}
          renderMenu={children => <div className="menu">{children}</div>}
          renderItem={(item, isHighlighted) => (
            <div
              className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
              key={item.id}
            >
              {item.name}
            </div>
          )}
        />
      </form>
    )
  }
}
export default SearchData
