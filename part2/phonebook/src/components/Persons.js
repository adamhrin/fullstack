import React from 'react'

const Person = (props) => <p>{props.name} {props.number}</p>

const Persons = ({ filteredPersons }) => {
  return filteredPersons.map(person => 
    <Person key={person.name} name={person.name} number={person.number}/>
  )
}

export default Persons