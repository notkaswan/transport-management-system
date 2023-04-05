import { useContext, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import axios from "axios"
import { UserContext } from "../UserContext"

export default function ProfilePage() {
    const [redirect, setRedirect] = useState(null)
    const {user, setUser} = useContext(UserContext)

    async function logout() {
        await axios.post('/logout')
        setRedirect('/login')
        setUser(null)
    }

    if(redirect) {
        return <Navigate to={redirect} />
    }

    return(
        <div>
            <div className="text-center max-w-lg mx-auto">
                Logged in as {user.name} ({user.email})<br />
                <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
            </div>
        </div>
    )
}