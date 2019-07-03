import React, { Component } from 'react'

export class HomeData extends Component {
  static displayName = HomeData.name

  render() {
    return (
      <div>
        <h1>Workout Buddy</h1>
        <p>Active Workout</p>
        <p>Active Workout Name</p>
        <table>
          <tbody>
            <tr>
              <th>Exercise</th>
              <th>Sets</th>
              <th>Reps</th>
              <th>Weight</th>
            </tr>
            <tr>
              <td>Bench Press</td>
              <td>3</td>
              <td>5</td>
              <td>200lbs</td>
            </tr>
            <tr>
              <td>Squats</td>
              <td>3</td>
              <td>5</td>
              <td>315lbs</td>
            </tr>
            <tr>
              <td>Pull</td>
              <td>3</td>
              <td>5</td>
              <td />
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
