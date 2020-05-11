import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    let found = false
    persons.forEach(person => { if (person.name === newName) found = true })

    if (found) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const filteredPersons = persons.filter((person) => {
    return person.name.toLowerCase().startsWith(filter.toLowerCase())
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleChange={(event) => setFilter(event.target.value)}></Filter>
      <h2>Add new number</h2>
      <PersonForm name={newName} number={newNumber}
        handleNameChange={(event) => setNewName(event.target.value)}
        handleNumberChange={(event) => setNewNumber(event.target.value)}
        handlePersonAdd={addPerson}></PersonForm>
      <h2>Numbers</h2>
      <Persons persons={filteredPersons}></Persons>
    </div >
  )

}

export default App
