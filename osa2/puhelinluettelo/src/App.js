import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    let found = false
    persons.forEach(person => { if (person.name === newName) found = true })

    if (found) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName
      }

      setPersons(persons.concat(personObject))
      setNewName('')
    }


  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
        </div>
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => <p key={person.name}>{person.name}</p>)}
    </div>
  )

}

export default App
