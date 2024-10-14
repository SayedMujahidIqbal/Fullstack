import React from 'react'
import PersonDetails from './PersonDetails'

const Persons = (props) => {
    const { filteredPersons, deletePerson } = props
  return (
    <div>
      <ul>
        {filteredPersons.map(person => <PersonDetails key={person.id} person={person} deletePerson={deletePerson} />)}
      </ul>
    </div>
  )
}

export default Persons
