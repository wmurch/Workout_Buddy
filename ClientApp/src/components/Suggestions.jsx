import React from 'react'
import Autocomplete from 'react-autocomplete'

const Suggestions = props => {
  const choices = props.results.map(r => {
    return <option value={r.value}>{r.name}</option>
  })
  return (
    <ul>
      <Autocomplete value={this.state.value} input>
        {choices}
      </Autocomplete>
    </ul>
  )
}

export default Suggestions
