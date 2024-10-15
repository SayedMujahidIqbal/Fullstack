import React, { useEffect, useState } from 'react'
import CountryFlag from './CountryFlag'
import CountryLanguages from './CountryLanguages'
import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY

const CountryDetails = ({ country }) => {
    const [weatherDetails, setWeahterDetails] = useState(null)
    const capital = country.capital

    useEffect(() =>{
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`)
        .then(response => {
            setWeahterDetails(response.data)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    console.log(weatherDetails)

  return (
    <>
        <h1>{country.name.common}</h1>
        <p><b>{country.capital}</b></p>
        <p><b>{country.area}</b></p>
        <h2>languages</h2>
        <CountryLanguages country={country} />
        <CountryFlag country={country} />
        <h2>Weather in {country.capital}</h2>
        {/* <image src={weatherDetails[0]} /> */}
        <p><b>Wind {weatherDetails.wind['speed']} m/s</b></p>
    </>
  )
}

export default CountryDetails
