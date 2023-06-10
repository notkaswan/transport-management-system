import { useEffect, useState } from "react"
import axios from 'axios'
import { Link } from "react-router-dom"

export default function ViewClient() {
    const [clients, setClients] = useState([])
    useEffect(() => {
        axios.get('/clients').then(({data}) => {
            setClients(data)
        })
    }, [])
    return (
        <div className="grid lg:grid-cols-3 sm:grid-cols-2">
            {clients.length > 0 && clients.map(client => (
                <Link to={'/add/client/'+client._id} className="flex gap-4 m-4 bg-gray-100 p-4 rounded-2xl">
                    <div>
                        <h2>Name: {client.clientName}</h2>
                        <h2>Remarks: {client.remarks}</h2>
                        <h2>Phone no.: {client.phoneNo}</h2>
                        <h2>Email: {client.email}</h2>
                    </div>
                </Link>
            ))}
        </div>
    )
} 