import React from 'react'

const PersonDetails = ({ person }) => <li key={person.name}>{person.name}{person.phoneNumber}</li>

export default PersonDetails
