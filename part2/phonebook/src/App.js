import React, { useState } from 'react'

const Filter = (props) => (
  <div>
    filter shown with
    <input value={props.filter} onChange={props.filterChangeHandler}/>
  </div>
)

const PersonForm = (props) => (
  <form onSubmit={props.submitHandler}>
    <div>
      name: 
      <input value={props.newName} onChange={props.nameChangeHandler}/>
    </div>
    <div>
      number:
      <input value={props.newNumber} onChange={props.numberChangeHandler}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Person = (props) => <p>{props.name} {props.number}</p>

const Persons = ({ filteredPersons }) => {
  return filteredPersons.map(person => 
    <Person key={person.name} name={person.name} number={person.number}/>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  // using additional array filteredPersons that will be rendered in the Persons list
  const [ filteredPersons, setFilteredPersons ] = useState(persons)
  const [ filter, setFilter ] = useState('')

  // this function filters persons according to the current filter value
  const filterPersons = (filter, personsToFilter = persons) => {
    const filteredPersons = personsToFilter.filter(
      person => {
        const re = new RegExp(filter, 'i')
        console.log(re);
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
      // filter newPersons and update filteredPersons state with the result
      setFilteredPersons(filterPersons(filter, newPersons))
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
    const filter = event.target.value
    setFilter(filter)
    setFilteredPersons(filterPersons(filter))
  }

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

      <Persons filteredPersons={filteredPersons} />
      
    </div>
  )
}

export default App