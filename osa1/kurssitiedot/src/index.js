import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <div>
    <Part part={props.part1} exercises={props.exercises1}></Part>
    <Part part={props.part2} exercises={props.exercises2}></Part>
    <Part part={props.part3} exercises={props.exercises3}></Part>
    </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.part} {props.exercises}</p>
  )
}

const Total = (props) => {
  let total = 0
  for (let part of props.parts) total += part
  return (
    <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}></Header>
      <Content part1={part1} part2={part2} part3={part3} exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}></Content>
      <Total parts={[exercises1, exercises2, exercises3]}></Total>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))