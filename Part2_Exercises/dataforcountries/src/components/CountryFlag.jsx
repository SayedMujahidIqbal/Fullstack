import React from 'react'

const CountryFlag = ({ country }) => <img src={country.flags.png} alt={country.flags.alt} />

export default CountryFlag
