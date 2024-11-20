import { useDispatch } from "react-redux"
import { filterChange } from "../reducers/filterReducer"

const SearchFilter = () => {
    const dispatch = useDispatch()

    const handleSearch = (event) => {
        dispatch(filterChange(event.target.value)) 
    }
    return (
        <div>
            filter <input onChange={handleSearch} />
        </div>
    )
}

export default SearchFilter
