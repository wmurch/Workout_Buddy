import React from 'react'
import Autocomplete from 'react-autocomplete'

const Suggestions = props => {
  const choices = props.results.map(r => {
    return <option value={r.value}>{r.name}</option>
  })
  return (
    <li>
      <Autocomplete
        items={choices}
        value={this.prop.value}
        getItemValue={item => item.name}
        renderItem={(item, isHighlighted) => (
          <div
            className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
            key={item.id}
          >
            {item.name}
          </div>
        )}
      />
    </li>
  )
}

export default Suggestions
