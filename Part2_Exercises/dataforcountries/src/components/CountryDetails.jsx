import React, { useEffect, useState } from 'react'
import CountryFlag from './CountryFlag'
import CountryLanguages from './CountryLanguages'
import axios from 'axios'

const api_key = import.meta.env.VITE_API_KEY

const CountryDetails = ({ country }) => {
    const [weatherDetails, setWeahterDetails] = useState(null)
    const capital = country.capital
    const iconCode = weatherDetails?.weather?.map(weather => weather.icon)

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`)
        .then(response => {
            setWeahterDetails(response.data)
        }).catch(error => {
            console.log(error)
        })
    }, [capital])

  return (
    <>
        <h1>{country.name.common}</h1>
        <p><b>{country.capital}</b></p>
        <p><b>{country.area}</b></p>
        <h2>languages</h2>
        <CountryLanguages country={country} />
        <CountryFlag country={country} />
        {
            weatherDetails &&  
            <>
                <h2>Weather in {country.capital}</h2>
                <p><b>Temperature { (Math.round(weatherDetails?.main['temp'] - 273.15) * 100 / 100).toFixed(2) } Celcius</b></p>
                <div>
                    <img src={`https://openweathermap.org/img/wn/${iconCode}@4x.png`} alt={country.name.common} />
                </div>
                <p><b>Wind {weatherDetails?.wind['speed']} m/s</b></p>
            </>
        }
    </>
  )
}

export default CountryDetails
