import { useEffect, useState } from "react"
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import Popup from "reactjs-popup"
import DropdownClients from "../DropdownClients"
import DropdownVehicles from "../DropdownVehicles";

export default function AddOrderPage() {
        const {id} = useParams()
    const [clientId, setClientId] = useState('')
    const [clientName, setClientName] = useState('')
    const [vehicleId, setVehicleId] = useState('')
    const [vehicle, setVehicle] = useState('')
    const [driver, setDriver] = useState('')
    const [driverId, setDriverId] = useState('')
    const [source, setSource] = useState('')
    const [destination, setDestination] = useState('')
    const [orderDate, setOrderDate] = useState('')
    const [sourceArrivalDate, setSourceArrivalDate] = useState('')
    const [loadDate, setLoadDate] = useState('')
    const [arrivalDate, setArrivalDate] = useState('')
    const [unloadDate, setUnloadDate] = useState('')
    const [freightCharges, setFreightCharges] = useState(0)
    const [advanceReceived, setAdvanceReceived] = useState(0)
    const [pay1, setPay1] = useState(0)
    const [pay2, setPay2] = useState(0)
    const [miscCharges, setMiscCharges] = useState(0)
    const [netAmount, setNetAmount] = useState(0)
    const [driverCash, setDriverCash] = useState(0)
    const [fuel, setFuel] = useState(0)
    const [fastag, setFastag] = useState(0)
    const [remarks, setRemarks] = useState('')
    const [redirect, setRedirect] = useState(false)
    useEffect(() => {
        if(!id) {
                return
        }
        axios.get('/orders/'+id).then(response => {
                const {data} = response
                setClientId(data.clientId)
                setClientName(data.clientName)
                setVehicleId(data.vehicleId)
                setDriver(data.driver)
                setDriverId(data.driverId)
                setSource(data.source)
                setDestination(data.destination)
                setOrderDate(chkDate(data.orderDate))
                setSourceArrivalDate(chkDate(data.sourceArrivalDate))
                setLoadDate(chkDate(data.loadDate))
                setArrivalDate(chkDate(data.arrivalDate))
                setUnloadDate(chkDate(data.unloadDate))
                setFreightCharges(data.freightCharges)
                setAdvanceReceived(data.advanceReceived)
                setPay1(data.pay1)
                setPay2(data.pay2)
                setMiscCharges(data.miscCharges)
                setNetAmount(data.netAmount)
                setDriverCash(data.driverCash)
                setFuel(data.fuel)
                setFastag(data.fastag)
                setRemarks(data.remarks)
        })
    }, [id])

    function chkDate(d) {
        if(!d) {
                return
        } else {
                return d.slice(0,10)
        }
    }

    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        )
    }

    function calNetAmount() {
        setNetAmount((freightCharges+miscCharges-advanceReceived-pay1-pay2))
    }

    async function addNewOrder(ev) {
        ev.preventDefault()
        const orderData = {
            clientId, clientName, vehicleId, vehicle, driver, driverId, source, destination,
            orderDate, sourceArrivalDate, loadDate, arrivalDate,
            unloadDate, freightCharges, advanceReceived, pay1,
            pay2, miscCharges, netAmount, driverCash, fuel, fastag, remarks
        }
        if(id) {
                //update order
                await axios.put('/orders', {
                        id, ...orderData
                })
        } else {
                // new order        
                await axios.post('/orders', orderData)
        }
        setRedirect(true)
    }

    if(redirect) {
        return <Navigate to={'/view/order'} />
    }

    return (
        <div>
            <form onSubmit={addNewOrder}>
                {inputHeader("Client: ")}
                <DropdownClients onChange={[setClientId, setClientName]} />
                {inputHeader('Vehicle: ')}
                <DropdownVehicles onChange={[setVehicleId, setVehicle, setDriver, setDriverId]} />
                {inputHeader('Driver: ')}
                <h3>{driver}</h3>
                {inputHeader('Source: ')}
                <input type="text" 
                        value={source} 
                        onChange={e => setSource(e.target.value)} 
                        placeholder="Source address" />
                {inputHeader('Destination: ')}
                <input type="text" 
                        value={destination} 
                        onChange={e => setDestination(e.target.value)}
                        placeholder="Destination address" />
                <div className="grid grid-cols-4">
                    {inputHeader('Order date: ')}
                    <input type="date" 
                            value={orderDate} 
                            onChange={e => setOrderDate(e.target.value)} />
                    {inputHeader('Source arrival date: ')}
                    <input type="date" 
                            value={sourceArrivalDate} 
                            onChange={e => setSourceArrivalDate(e.target.value)} />
                    {inputHeader('Load date: ')}
                    <input type="date" 
                            value={loadDate} 
                            onChange={e => setLoadDate(e.target.value)} />
                    {inputHeader('Arrival date: ')}
                    <input type="date" 
                            value={arrivalDate} 
                            onChange={e => setArrivalDate(e.target.value)} />
                    {inputHeader('Unload date: ')}
                    <input type="date" 
                            value={unloadDate} 
                            onChange={e => setUnloadDate(e.target.value)} />
                </div>
                <div className="grid grid-cols-4">
                        {inputHeader('Client payment details:')}
                        <Popup className="bg-red-300" trigger={<button type="button" className="primary">Add payments</button>} modal nested>
                                {
                                        close => (
                                                <div className="bg-red-300">
                    {inputHeader('Freight charges: ')}
                    <input type="number"
                            value={freightCharges} 
                            onChange={e => setFreightCharges(parseInt(e.target.value))}
                                placeholder="Freight charges" />
                    {inputHeader('Advance received: ')}
                    <input type="number"
                            value={advanceReceived} 
                            onChange={e => setAdvanceReceived(parseInt(e.target.value))}
                            placeholder="Advance received" />
                    {inputHeader('Pay 1: ')}
                    <input type="number"
                            value={pay1} 
                            onChange={e => setPay1(parseInt(e.target.value))}
                            placeholder="received payment" />
                    {inputHeader('Pay 2: ')}
                    <input type="number"
                            value={pay2} 
                            onChange={e => setPay2(parseInt(e.target.value))}
                            placeholder="received payment" />
                    {inputHeader('Miscellaneous charges: ')}
                    <input type="number"
                            value={miscCharges} 
                            onChange={e => setMiscCharges(parseInt(e.target.value))}
                            placeholder="Miscellaneous charges" />
                        <button  onClick={calNetAmount()}></button>
                        </div>
                            )
                        }
                    </Popup>
                    {inputHeader('Net amount: ')}
                    <input type="number"
                            value={netAmount} 
                            onChange={e => setNetAmount(parseInt(e.target.value))}
                            placeholder="" />
                </div>
                <div className="grid grid-cols-4">
                        {inputHeader('Driver cash: ')}
                        <input type="number"
                                value={driverCash} 
                                onChange={e => setDriverCash(parseInt(e.target.value))}
                                placeholder="" />
                        {inputHeader('Fuel: ')}
                        <input type="number"
                                value={fuel} 
                                onChange={e => setFuel(parseInt(e.target.value))}
                                placeholder="" />
                        {inputHeader('FASTag: ')}
                        <input type="number"
                                value={fastag} 
                                onChange={e => setFastag(parseInt(e.target.value))}
                                placeholder="" />
                </div>
                {inputHeader('Remarks: ')}
                <input type="text"
                        value={remarks} 
                        onChange={e => setRemarks(e.target.value)}
                        placeholder="Remarks" />
                <button className="primary my-4" type="submit">Save</button>
            </form>
        </div>
    )
}