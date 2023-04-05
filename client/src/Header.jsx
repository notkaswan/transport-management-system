import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "./UserContext"

export default function Header() {
    const {user} = useContext(UserContext)
    // console.log(user)
    return (
        <header className="flex justify-between text-white bg-gray-700 h-20 mb-10">
            <div className="flex items-center font-bold text-white text-center text-4xl ">
                {user? user.company: "Transport Management System"}
            </div>
            {!!user && (
                <Link to={'/account'} className='flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4'>
                    <div className="bg-gray-500 rounded-full border border-gray-500 overflow-hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 top-1">
                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div>
                        <div>
                            {user.name}
                        </div>
                    </div>
                </Link>
            )}
        </header>
    )
}