import axios from "axios"
import { useEffect, useState } from "react"

function App() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then((response) => {
      setCountries(response.data)
    })
  }, [])


  const handleSearch = (event) => {
    const searchedTerm = event.target.value
    setSearchCountry(searchedTerm)
  }

  return (
    <div>
      find countries <input onChange={handleSearch} value={searchCountry} />
      <ul>
        {filteredCountries.map(country => 
          <li key={country.name.common}>{country.name.common}</li>
        )}
      </ul>
    </div>
  )
}

export default App
