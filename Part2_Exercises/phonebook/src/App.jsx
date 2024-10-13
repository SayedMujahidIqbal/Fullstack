import { useEffect, useState } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import axios from "axios"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])


  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      const personsList = response.data
      setPersons(personsList)
      setFilteredPersons(personsList)
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
      phoneNumber: newPhoneNumber,
      id: Math.random() * 5
    }

    const personExist = persons.filter(person => { return (person.name === personObject.name && person.phoneNumber === personObject.phoneNumber)})

    personExist.length ? (
      alert(`${personObject.name} with same phone number is already added to the phonebook`),
      setNewName(''),
      setNewPhoneNumber('')
    ) :
    (
      setPersons(persons.concat(personObject)),
      setFilteredPersons([...persons, personObject]),
      setNewName(''),
      setNewPhoneNumber('')
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
  
  return (
    <div>
      <h2>Phonebook</h2>
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
      />
    </div>
  )
}

export default App
