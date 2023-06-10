import { useEffect, useState } from "react"
import axios from 'axios'
import { Link } from "react-router-dom"

export default function ViewVehicle() {
    const [vehicles, setVehicles] = useState([])
    useEffect(() => {
        axios.get('/vehicles').then(({data}) => {
            setVehicles(data)
        })
    }, [])
    return (
        <div className="grid lg:grid-cols-3 sm:grid-cols-2">
            {vehicles.length > 0 && vehicles.map(vehicle => (
                <Link to={'/add/vehicle/'+vehicle._id} className="flex gap-4 m-4 bg-gray-100 p-4 rounded-2xl">
                    <div>
                        <h2>Owner Name: {vehicle.ownerName}</h2>
                        <h2>Driver Name: {vehicle.driver}</h2>
                        <h2>Maker: {vehicle.maker}</h2>
                        <h2>Model: {vehicle.model}</h2>
                        <h2>Plate number: {vehicle.plateNumber}</h2>
                    </div>
                </Link>
            ))}
        </div>
    )
} 