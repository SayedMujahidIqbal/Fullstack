import { useEffect, useState } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import personService from './services/persons'
import Notification from "./components/Notification"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])
  const [message, setMessage] = useState({ success: '', error: '' })


  useEffect(() => {
    personService.getAll()
    .then(initialPersonsList => {
      setPersons(initialPersonsList)
      setFilteredPersons(initialPersonsList)
    })
  }, [])

  const addNewName = (event) => {
    setNewName(event.target.value)
  }

  const addNewPhoneNumber = (event) => {
    setNewPhoneNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newPhoneNumber,
    }

    const personAlreadyAdded = persons.find(person => person.name.toLowerCase() === personObject.name.toLowerCase())

    personAlreadyAdded ? (
      alert(`${personObject.name} with same phone number is already added to the phonebook, replace the old number with a new one`),
      personService.update(personAlreadyAdded.id, personObject)
      .then(updatedPerson => {
        setMessage({ success: `${updatedPerson.name} number updated successfully` })
        setTimeout(() => {
          setMessage({ success: '' })
        }, 5000)
        setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person))
        setFilteredPersons(filteredPersons.map(person => person.id === updatedPerson.id ? updatedPerson : person))
        setNewName(''),
        setNewPhoneNumber('')
      }).catch(error => {
        setMessage({ error: error.response.data.error })
        setTimeout(() => {
          setMessage({error: ''})
        }, 5000)
      })
    ) :
    (
      personService.create(personObject)
      .then(createdPerson => {
        setMessage({ success: `${createdPerson.name} added successfully` })
        setTimeout(() => {
          setMessage({ success: '' })
        }, 5000)
        setPersons(persons.concat(createdPerson))
        setFilteredPersons(filteredPersons.concat(createdPerson))
        setNewName(''),
        setNewPhoneNumber('')
      }).catch(error => {
        setMessage({ error: error.response.data.error })
        setTimeout(() => {
          setMessage({error: ''})
        }, 5000)
      })
    )
  }

  const handleSearch = (event) => {
    const searchTerm = event.target.value
    setSearchName(searchTerm)

    const filteredNames = persons.filter((person) =>
      person.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    )
    setFilteredPersons(filteredNames)
  }

  const deletePerson = (id) => {
    const personToBedeleted = persons.find(person => person.id === id)
    alert(`Delete ${personToBedeleted.name}`)
    personService.deletePerson(id)
    .then(response => {
      setMessage({ success: `${personToBedeleted.name} deleted successfully` })
        setTimeout(() => {
          setMessage({ success: '' })
        }, 5000)
      personService.getAll()
      .then(updatedPersonsList => {
        setPersons(updatedPersonsList)
        setFilteredPersons(updatedPersonsList)
      })
    }).catch(error => {
      setMessage({ error: error.response.data.error })
      setTimeout(() => {
        setMessage({ error: '' })
      }, 5000)
    })
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification 
        message={message}
      />
      <Filter
        handleSearch={handleSearch}
        searchName={searchName}
      />
      <h3>Add a new</h3>
      <PersonForm 
        addPerson={addPerson}
        addNewName={addNewName}
        newName={newName}
        addNewPhoneNumber={addNewPhoneNumber}
        newPhoneNumber={newPhoneNumber}
      />
      <h2>numbers</h2>
      <Persons 
        filteredPersons={filteredPersons}
        deletePerson={deletePerson} 
      />
    </div>
  )
}

export default App
