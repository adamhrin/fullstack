import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        const personsData = response.data
        setPersons(personsData)
      })
  }, [])

  // this function filters persons according to the current filter value
  const getFilteredPersons = (filter) => {
    const filteredPersons = persons.filter(
      person => {
        const re = new RegExp(filter, 'i')
        return person.name.match(re)
      }
    )
    return filteredPersons
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    // create copy of persons with new added person
    const newPersons = persons.concat(newPerson)
    // check for duplicates
    const nameArr = newPersons.map(person => person.name)
    const isDuplicate = nameArr.some((name, id) => 
      nameArr.indexOf(name) != id
    )

    if (isDuplicate) {
      alert(`${newName} is already in the phonebook`)
    } else {
      setPersons(newPersons)
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = getFilteredPersons(filter)

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} filterChangeHandler={handleFilterChange} />

      <h3>Add a new person</h3>

      <PersonForm 
        submitHandler={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        nameChangeHandler={handleNameChange}
        numberChangeHandler={handleNumberChange}
      />
      
      <h3>Numbers</h3>

      <Persons filteredPersons={personsToShow} />
      
    </div>
  )
}

export default App