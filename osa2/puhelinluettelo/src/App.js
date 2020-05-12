import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Error from './components/Error'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService.getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    let found = false
    let id = 0
    persons.forEach(person => {
      if (person.name === newName) {
        found = true
        id = person.id
      }
    })

    if (found) {
      if (window.confirm(`${newName} is already added to phonebook. Replace old number with new number?`)) {
        const personObject = {
          name: newName,
          number: newNumber,
        }
        personService.update(id, personObject)
          .then(returnedPerson => {
            setPersons(persons.filter(n => n.id !== id).concat(returnedPerson))
            setNewName('')
            setNewNumber('')
            setErrorMessage(`Edited ${returnedPerson.name} `)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService.create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setErrorMessage(`Added ${returnedPerson.name} `)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })


    }
  }

  const deletePerson = (id) => {
    const person = persons.find(n => n.id === id)

    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.deleteObject(id)
        .then(() => {
          setPersons(persons.filter(n => n.id !== id))
          setErrorMessage(`Deleted ${person.name} `)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch(error => {
          alert(
            `The name ${person.name} was already deleted from the phonebook`
          )
          setPersons(persons.filter(n => n.id !== id))
        })
    }

  }

  const filteredPersons = persons.filter((person) => {
    return person.name.toLowerCase().startsWith(filter.toLowerCase())
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <Error message={errorMessage}></Error>
      <Filter filter={filter} handleChange={(event) => setFilter(event.target.value)}></Filter>
      <h2>Add new number</h2>
      <PersonForm name={newName} number={newNumber}
        handleNameChange={(event) => setNewName(event.target.value)}
        handleNumberChange={(event) => setNewNumber(event.target.value)}
        handlePersonAdd={addPerson}></PersonForm>
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} handleDeleteOf={deletePerson}></Persons>
    </div >
  )

}

export default App
