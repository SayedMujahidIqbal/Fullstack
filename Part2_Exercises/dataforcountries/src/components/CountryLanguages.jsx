import React from 'react'

const CountryLanguages = ({ country }) => {
  return (
    <ul>
        {Object.keys(country.languages).map(key => <li key={key}><b>{country.languages[key]}</b></li>)}
    </ul>
  )
}

export default CountryLanguages
