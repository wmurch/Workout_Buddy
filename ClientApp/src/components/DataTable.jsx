import React, { Component } from 'react'
import Autocomplete from 'react-autocomplete'
import axios from 'axios'
this.state = {
  exercise: {},
  exercises: []
}

class DataTable extends Component {
  getExercisesForAutoComplete(value, callback) {
    axios.get(`/api/search/exercises?=${value}`).then(resp => {
      callback(resp.data)
    })
  }
  onDelEvent() {
    this.props.handleRowDel(this.props.exercise)
  }

  render() {
    return (
      <tr className="eachRow">
        <td>
          <Autocomplete
            inputProps={{ id: 'exerciseId' }}
            value={this.props.value}
            items={this.props.exercises}
            getItemValue={item => item.name}
            onSelect={(value, exercise) => {
              console.log({ value })
              /* this.props.addExerciseState(this.state.selectedExercise) */
              this.setState({ value, selectedExercise: exercise })
            }}
            onChange={(event, value) => {
              this.setState({ value })
              clearTimeout(this.requestTimer)
              console.log({ value })
              this.requestTimer = this.getExercisesForAutoComplete(
                value,
                searchResults => {
                  console.log('cb', { searchResults })
                  this.setState({ exercises: searchResults })
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
        </td>
        <td>
          <input
            type="number"
            placeholder="Sets"
            name="Sets"
            onChange={this.props.updateValue}
          />
        </td>
        <td>
          <input
            type="number"
            placeholder="Reps"
            name="Reps"
            onChange={this.props.updateValue}
          />
        </td>
        <td>
          <input
            type="number"
            placeholder="Weight"
            name="Weight"
            onChange={this.props.updateValue}
          />
        </td>
        <td className="del-cell">
          <input
            type="button"
            onClick={this.onDelEvent.bind(this)}
            value="X"
            className="del-btn"
          />
        </td>
      </tr>
    )
  }
}
export default DataTable
