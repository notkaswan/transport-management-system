import { useEffect, useState } from "react"
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";

export default function AddClientPage() {
    const {id} = useParams()
    const [clientName, setClientName] = useState('')
    const [remarks, setRemarks] = useState('')
    const [phoneNo, setPhoneNo] = useState('')
    const [altPhoneNo, setAltPhoneNo] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [gstin, setGstin] = useState('')
    const [redirect, setRedirect] = useState(false)
    useEffect(() => {
        if(!id) {
            return
        }
        axios.get('/clients/'+id).then(response => {
            const {data} = response
            setClientName(data.clientName)
            setRemarks(data.remarks)
            setPhoneNo(data.phoneNo)
            setAltPhoneNo(data.altPhoneNo)
            setEmail(data.email)
            setAddress(data.address)
            setGstin(data.gstin)
        })
    }, [id])

    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        )
    }

    async function addNewClient(ev) {
        ev.preventDefault()
        const clientData = {
            clientName, remarks, phoneNo, 
            altPhoneNo, email, address, 
            gstin
        }
        if(id) {
            // update client
            await axios.put('/clients', {
                id, ...clientData
            })
        } else {
            // new client
            await axios.post('/clients', clientData)
        }
        setRedirect(true)
    }

    if(redirect) {
        return <Navigate to={'/view/client'} />
    }

    return (
        <div>
            <form onSubmit={addNewClient}>
                <div className="grid grid-cols-4">
                    {inputHeader("Client's Name")}
                    <input type="text" 
                            value={clientName} 
                            onChange={e => setClientName(e.target.value)} 
                            placeholder="Client's name" />
                    {inputHeader('Remarks')}
                    <input type="text" 
                            value={remarks} 
                            onChange={e => setRemarks(e.target.value)} 
                            placeholder="Other notes regarding the client" />
                    {inputHeader('Phone no.')}
                    <input type="number" 
                            value={phoneNo} 
                            onChange={e => setPhoneNo(e.target.value)} 
                            placeholder="Mobile number" />
                    {inputHeader('Alternative Phone no.')}
                    <input type="number" 
                            value={altPhoneNo} 
                            onChange={e => setAltPhoneNo(e.target.value)}
                            placeholder="Alternative mobile number" />
                    {inputHeader('Email')}
                    <input type="email" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Email address" />
                    {inputHeader('Address')}
                    <input type="text"
                            value={address} 
                            onChange={e => setAddress(e.target.value)}
                            placeholder="Address" />
                    {inputHeader('GSTIN')}
                    <input type="text"
                            value={gstin} 
                            onChange={e => setGstin(e.target.value)}
                            placeholder="GSTIN" />
                </div>
                <button className="primary my-4" type="submit">Save</button>
            </form>
        </div>
    )
}