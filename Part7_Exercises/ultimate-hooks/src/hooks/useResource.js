import { useEffect, useState } from "react"
import axios from "axios"

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
}

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
  
    const get = async () => {
      const response = await service.get(baseUrl)
      setResources(response)
    }

    const create = async (newResource) => {
      const createdResource = await service.create(newResource)
      setResources((prevResouces => [...prevResouces, createdResource]))
    }
  
    const service = {
        get: async (baseUrl) => { 
          const response = await axios.get(baseUrl)
          return response.data
        },
        create: async (resource) => {
          const response = await axios.post(baseUrl, resource)
          return response.data
        }
    }

    useEffect(() => {
      get()
    }, [baseUrl])
  
    return [
      resources, {create}
    ]
  }