import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.name}</button>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.stat}{(props.text === "positive") && <span> %</span>}</td>
    </tr>
  )
}

const Statistics = (props) => {
  let average = 0
  let positive = 0
  let info = <p>No feedback given</p>
  if (props.good + props.neutral + props.bad) {
    average = (props.good - props.bad) / (props.good + props.neutral + props.bad)
    positive = (props.good * 100) / (props.good + props.neutral + props.bad)
    info = <table>
      <tbody>
        <StatisticLine text="good" stat={props.good}></StatisticLine>
        <StatisticLine text="neutral" stat={props.neutral}></StatisticLine>
        <StatisticLine text="bad" stat={props.bad}></StatisticLine>
        <StatisticLine text="average" stat={average}></StatisticLine>
        <StatisticLine text="positive" stat={positive}></StatisticLine>
      </tbody>
    </table>
  }
  return (
    <div>
      <h1>Statistics</h1>
      {info}
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button name="good" handleClick={handleGood}></Button>
      <Button name="neutral" handleClick={handleNeutral}></Button>
      <Button name="bad" handleClick={handleBad}></Button>

      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
