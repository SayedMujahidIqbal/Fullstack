import { useState } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phoneNumber: '1223423423', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('set new name')
  const [newPhoneNumber, setNewPhoneNumber] = useState('Type your number here')
  const [searchName, setSearchName] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)

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
