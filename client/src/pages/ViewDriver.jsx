import { useEffect, useState } from "react"
import axios from 'axios'
import { Link } from "react-router-dom"

export default function ViewDriver() {
    const [drivers, setDrivers] = useState([])
    useEffect(() => {
        axios.get('/drivers').then(({data}) => {
            setDrivers(data)
        })
    }, [])
    return (
        <div className="grid lg:grid-cols-3 sm:grid-cols-2">
            {drivers.length > 0 && drivers.map(driver => (
                <Link to={'/add/driver/'+driver._id} className="flex gap-4 m-4 bg-gray-100 p-4 rounded-2xl">
                    <div className="flex w-32 h-32 bg-gray-300">
                        {driver.profileImage && (
                                <img className="object-cover" src={'http://localhost:4000/uploads/'+driver.profileImage} alt="" />
                            )}
                    </div>
                    <div>
                        <h2>Name: {driver.name}</h2>
                        <h2>D.O.B: {driver.dob.slice(0,10)}</h2>
                        <h2>Phone no.: {driver.phoneNo}</h2>
                        <h2>Email: {driver.email}</h2>
                    </div>
                </Link>
            ))}
        </div>
    )
}