import { useState } from "react"
import PhotosUploader from "../PhotosUploader";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function AddDriverPage() {
    const [name, setName] = useState('')
    const [dob, setDob] = useState('')
    const [phoneNo, setPhoneNo] = useState('')
    const [altPhoneNo, setAltPhoneNo] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [aadhaarNo, setAadhaarNo] = useState('')
    const [driverLicense, setDriverLicense] = useState('')
    const [profileImage, setProfileImage] = useState('')
    const [redirect, setRedirect] = useState(false)

    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        )
    }

    async function addNewDriver(ev) {
        ev.preventDefault()
        await axios.post('/drivers', {
            name, dob, phoneNo, 
            altPhoneNo, email, address, 
            aadhaarNo, driverLicense, profileImage
        })
        setRedirect(true)
    }

    if(redirect) {
        return <Navigate to={'/home'} />
    }

    return (
        <div>
            <form onSubmit={addNewDriver}>
                {inputHeader('Name')}
                <input type="text" 
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                        placeholder="Full name" />
                {inputHeader('Dob')}
                <input type="date" 
                        value={dob} 
                        onChange={e => setDob(e.target.value)} />
                {inputHeader('Phone no.')}
                <input type="number" 
                        value={phoneNo} 
                        onChange={e => setPhoneNo(e.target.value)} 
                        placeholder="mobile number" />
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
                        placeholder="address" />
                {inputHeader('Aadhaar no.')}
                <input type="number"
                        value={aadhaarNo} 
                        onChange={e => setAadhaarNo(e.target.value)}
                        placeholder="Aadhaar number" />
                {inputHeader('DL no.')}
                <input type="text" 
                        value={driverLicense} 
                        onChange={e => setDriverLicense(e.target.value)}
                        placeholder="Driver's license number" />
                {inputHeader('Profile picture')}
                <PhotosUploader profileImage={profileImage} onChange={setProfileImage} />
                <button className="primary my-4" type="submit">Save</button>
            </form>
        </div>
    )
}