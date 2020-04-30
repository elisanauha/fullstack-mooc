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
    <Part part={props.part1.name} exercises={props.part1.exercises}></Part>
    <Part part={props.part2.name} exercises={props.part2.exercises}></Part>
    <Part part={props.part3.name} exercises={props.part2.exercises}></Part>
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
  // const course = 'Half Stack application development'
  // const part1 = 'Fundamentals of React'
  // const exercises1 = 10
  // const part2 = 'Using props to pass data'
  // const exercises2 = 7
  // const part3 = 'State of a component'
  // const exercises3 = 14
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }


  return (
    <div>
      <Header course={course}></Header>
      <Content part1={part1} part2={part2} part3={part3}></Content>
      <Total parts={[part1.exercises, part2.exercises, part3.exercises]}></Total>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))