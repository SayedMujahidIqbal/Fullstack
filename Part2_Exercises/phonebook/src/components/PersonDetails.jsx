import React from 'react'

const PersonDetails = ({ person, deletePerson }) => <li key={person.name}>{person.name} {person.number} <button onClick={() => deletePerson(person.id)}>delete</button></li>
    

export default PersonDetails
