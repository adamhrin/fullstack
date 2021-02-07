import React from 'react'

const Header = (props) => <h2>{props.course}</h2> 

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <b>total of {total} exercises</b>
  )
    
}

const Part = (props) => <p>{props.part} {props.exercises}</p>

const Content = ({ parts }) => (
  <>
    {parts.map(part => 
      <Part key={part.id} part={part.name} exercises={part.exercises} />
    )}
  </>
)

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content 
          parts={course.parts}
      /> 
      <Total parts={course.parts} />
    </div>
  )
}

export default Course