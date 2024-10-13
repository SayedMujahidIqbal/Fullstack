import React from 'react'

const Filter = (props) => {
    const { handleSearch, searchName } = props
  return (
    <div>
        <p>Filter shown with</p>
        <input onChange={handleSearch} value={searchName} />
    </div>
  )
}

export default Filter
