import React from 'react'

const Suggestions = props => {
  const options = props.results.map(r => (
    <li key={r.id}>
      {`Workout Name: ${r.name}`}
      {`Exercise: ${r.name}`}
      {`Sets: ${r.sets}`}
      {`Reps: ${r.reps}`}
    </li>
  ))
  return <ul>{options}</ul>
}

export default Suggestions
