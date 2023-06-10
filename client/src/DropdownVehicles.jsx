import axios from "axios"
import { useEffect, useState } from "react"

export default function DropdownVehicles(props) {
    const [vehicles, setVehicles] = useState([])
    useEffect(() => {
        axios.get('/vehicles').then(({data}) => {
            setVehicles(data)
        })
    }, [])
    function handleSelect(e) {
        props.onChange[0](e.target.value.split(',')[0])
        props.onChange[1](e.target.value.split(',')[1])
        props.onChange[2](e.target.value.split(',')[2])
        props.onChange[3](e.target.value.split(',')[3])
    }

    return (
        <select onChange={handleSelect}>
            <option value="" disabled selected>select...</option>
            {vehicles.length > 0 && vehicles.map(vehicle => (
                <option value={[vehicle._id, vehicle.plateNumber, vehicle.driver, vehicle.driverId]}>{vehicle.plateNumber}</option>
            ))}
        </select>
    )
}