import { useState } from "react";
import { Navigate } from "react-router-dom";
import Tiles from "../Tiles";

export default function HomePage() {
    const [redirect, setRedirect] = useState('')

    if(redirect) {
        return <Navigate to={redirect} />
    }


    return(
        <div className="grid grid-cols-3 lg:grid-cols-4 p-4 gap-4">
            <Tiles name='driver' onChange={setRedirect}/>
            <Tiles name='client' onChange={setRedirect}/>
            <Tiles name='vehicle' onChange={setRedirect}/>
            <Tiles name='order' onChange={setRedirect} />
        </div>
    )
}