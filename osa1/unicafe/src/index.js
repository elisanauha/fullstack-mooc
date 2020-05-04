import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.name}</button>
  )
}

const Stats = (props) => {
  return (
    <p>{props.text} {props.stat}</p>
  )
}

const Average = (props) => {
  let average = 0
  if (props.good + props.neutral + props.bad)
    average = (props.good - props.bad) / (props.good + props.neutral + props.bad)
  return (
    <p>average {average}</p>
  )
}

const Positive = (props) => {
  let positive = 0
  if (props.good + props.neutral + props.bad)
    positive = (props.good * 100) / (props.good + props.neutral + props.bad)
  return (
    <p>positive {positive} %</p>
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
      <h1>Statistics</h1>
      <Stats text="good" stat={good}></Stats>
      <Stats text="neutral" stat={neutral}></Stats>
      <Stats text="bad" stat={bad}></Stats>
      <Average good={good} neutral={neutral} bad={bad}></Average>
      <Positive good={good} neutral={neutral} bad={bad}></Positive>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
