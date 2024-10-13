import React from 'react'
import PersonDetails from './PersonDetails'

const Persons = (props) => {
    const { filteredPersons } = props
  return (
    <div>
      <ul>
        {filteredPersons.map(person => <PersonDetails key={person.id} person={person} />)}
      </ul>
    </div>
  )
}

export default Persons
