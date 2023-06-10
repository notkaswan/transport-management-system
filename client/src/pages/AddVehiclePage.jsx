import { useEffect, useState } from "react"
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import DropdownDrivers from "../DropdownDrivers";

export default function AddVehiclePage() {
    const {id} = useParams()
    const [ownerName, setOwnerName] = useState('')
    const [driverId, setDriverId] = useState('')
    const [driver, setDriver] = useState('')
    const [maker, setMaker] = useState('')
    const [model, setModel] = useState('')
    const [plateNumber, setPlateNumber] = useState('')
    const [capacity, setCapacity] = useState('')
    const [height, setHeight] = useState('')
    const [noOfTires, setNoOfTires] = useState('')
    const [redirect, setRedirect] = useState(false)
    useEffect(() => {
        if(!id) {
            return
        }
        axios.get('/vehicles/'+id).then(response => {
            const {data} = response
            setOwnerName(data.ownerName)
            setDriverId(data.driverId)
            setDriver(data.driver)
            setMaker(data.maker)
            setModel(data.model)
            setPlateNumber(data.plateNumber)
            setCapacity(data.capacity)
            setHeight(data.height)
            setNoOfTires(data.noOfTires)
        })
    }, [id])
    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        )
    }

    async function addNewVehicle(ev) {
        ev.preventDefault()
        const vehicleData = {
            ownerName, driverId, driver, maker, model, 
            plateNumber, height, capacity, 
            noOfTires
        }
        if(id) {
            // update vehicle
            await axios.put('/vehicles', {
                id, ...vehicleData
            })
        } else {
            // new vehicle
            await axios.post('/vehicles', vehicleData)
        }
        console.log(vehicleData)
        setRedirect(true)
    }

    if(redirect) {
        return <Navigate to={'/home'} />
    }

    return (
        <div>
            <form onSubmit={addNewVehicle}>
                <div className="grid grid-cols-4">
                    {inputHeader("Owner's Name")}
                    <input type="text" 
                            value={ownerName} 
                            onChange={e => setOwnerName(e.target.value)} 
                            placeholder="Vehicle Owner's name" />
                    {inputHeader("Driver")}
                    <DropdownDrivers value={driver} onChange={[setDriverId, setDriver]} />
                    {inputHeader("Maker's name")}
                    <input type="text" 
                            value={maker} 
                            onChange={e => setMaker(e.target.value)} 
                            placeholder="Vehicle maker's name" />
                    {inputHeader('Vehicle Model')}
                    <input type="number" 
                            value={model} 
                            onChange={e => setModel(e.target.value)} 
                            placeholder="Vehicle's manufacturing year" />
                    {inputHeader('Plate Number')}
                    <input type="text" 
                            value={plateNumber} 
                            onChange={e => setPlateNumber(e.target.value)}
                            placeholder="Vehicle's plate number" />
                    {inputHeader('capacity')}
                    <input type="number" 
                            value={capacity} 
                            onChange={e => setCapacity(e.target.value)}
                            placeholder="Total loading capacity in tons" />
                    {inputHeader('Height')}
                    <input type="number"
                            value={height} 
                            onChange={e => setHeight(e.target.value)}
                            placeholder="Height of container" />
                    {inputHeader('Number of tires on vehicle')}
                    <input type="number"
                            value={noOfTires} 
                            onChange={e => setNoOfTires(e.target.value)}
                            placeholder="Number of tires installed on vehicle" />
                </div>
                <button className="primary my-4" type="submit">Save</button>
            </form>
        </div>
    )
}