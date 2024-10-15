import axios from "axios"
import { useEffect, useState } from "react"
import Notification from "./components/Notification"
import Country from "./components/Country"
// variable api_key now has the value set in startup

function App() {
  const [countries, setCountries] = useState(null)
  const [filteredCountries, setFilteredCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')
  const [message, setMessage] = useState('')
  const [showCountry, setShowCountry] = useState(false)
  const [countryClicked, setCountryClicked] = useState('')

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then((response) => {
        setCountries(response.data)
      })
  }, [])

  const handleSearch = (event) => {
    const searchedTerm = event.target.value
    setSearchCountry(searchedTerm)

    const filteredCountriesList = countries.filter(country => country.name.common.toLowerCase().startsWith(searchedTerm.toLowerCase()))
    if(filteredCountriesList.length > 10){
      setMessage('Too many matches, specify another filter ')
    } else if(filteredCountriesList.length <= 10 && filteredCountriesList.length > 0){
      setFilteredCountries(filteredCountriesList)
      setMessage('')
    } else {
      setFilteredCountries(filteredCountriesList)
      setMessage('')
    }
  }

  const handleShow = (name) => {
    if(name) {
      setShowCountry(!showCountry)
      setCountryClicked(name)
    }
  }

  return (
    <>
      find countries <input onChange={handleSearch} value={searchCountry} />
      {message && <Notification message={message} />}
      <ul>
        {
          filteredCountries.length <= 10 && filteredCountries.length > 1 
            && filteredCountries.map(country =>
              <Country 
                key={country.name.common} 
                country={country} 
                handleShow={() => handleShow(country.name.common)} 
                show={showCountry}
                countryClicked={countryClicked} 
              />
            ) 
        }
      </ul>
    </>
  )
}

export default App
