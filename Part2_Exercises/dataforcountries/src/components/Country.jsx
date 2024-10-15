import React from 'react'
import CountryDetails from './CountryDetails'

const Country = (props) => {
    const { country, handleShow, show, countryClicked } = props
    return(
        <>
            <li>
                {country.name.common} 
                <button onClick={handleShow}>{show && countryClicked === country.name.common ? 'close' : 'show'}</button>
            </li>
            {show && countryClicked === country.name.common && <CountryDetails country={country} />}
        </>
    )
}
 

export default Country
