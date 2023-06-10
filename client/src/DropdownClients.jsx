import axios from "axios"
import { useEffect, useState } from "react"

export default function DropdownClients(props) {
    const [clients, setClients] = useState([])
    useEffect(() => {
        axios.get('/clients').then(({data}) => {
            setClients(data)
        })
    }, [])
    function handleSelect(e) {
        console.log(e.target.value.split(',')[0])
        props.onChange[0](e.target.value.split(',')[0])
        props.onChange[1](e.target.value.split(',')[1])
    }

    return (
        <select onChange={handleSelect}>
            <option value="" disabled selected>select...</option>
            {clients.length > 0 && clients.map(client => (
                <option value={[client._id, client.clientName]}>{client.clientName}</option>
            ))}
        </select>
    )
}