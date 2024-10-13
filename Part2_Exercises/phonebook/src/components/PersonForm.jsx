import React from 'react'

const PersonForm = (props) => {
    const { 
        addPerson, 
        addNewName, 
        newName, 
        addNewPhoneNumber, 
        newPhoneNumber 
    } = props
    
  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={addNewName} value={newName} />
        </div>
        <div>
          number: <input onChange={addNewPhoneNumber} value={newPhoneNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm
