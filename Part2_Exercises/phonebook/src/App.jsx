import { useState } from "react"

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
      phoneNumber: newPhoneNumber
    }
    const personExist = persons.filter(person => { return (person.name === personObject.name && person.phoneNumber === personObject.phoneNumber)})
    personExist.length ? (
      alert(`${personObject.name} with same phone number is already added to the phonebook`),
      setNewName(''),
      setNewPhoneNumber('')
    ) :
    (
      setPersons(persons.concat(personObject)),
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
      <div>
        <p>Filter shown with</p>
        <input onChange={handleSearch} value={searchName} />
      </div>
      <form onSubmit={addPerson}>
        <div>
          <h1>Add a new</h1>
        </div>
        <div>
          name: <input onChange={addNewName} value={newName} />
        </div>
        <div>
          name: <input onChange={addNewPhoneNumber} value={newPhoneNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>numbers</h2>
      <ul>
      {filteredPersons.map(person => <li key={person.name}>{person.name}{person.phoneNumber}</li>)}
      </ul>
    </div>
  )
}

export default App
