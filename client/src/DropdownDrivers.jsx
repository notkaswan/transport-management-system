import axios from "axios"
import { useEffect, useState } from "react"

export default function DropdownDrivers(props) {
    const [drivers, setDrivers] = useState([])
    useEffect(() => {
        axios.get('/drivers').then(({data}) => {
            setDrivers(data)
        })
    }, [])
    function handleSelect(e) {
        props.onChange[0](e.target.value.split(',')[0])
        props.onChange[1](e.target.value.split(',')[1])
    }
    console.log(props)

    return (
        <select onChange={handleSelect}>
            <option value="" disabled selected>select...</option>
            {drivers.length > 0 && drivers.map(driver => (
                <option selected={props.value === driver.name} value={[driver._id, driver.name]}>{driver.name}</option>
            ))}
        </select>
    )
}