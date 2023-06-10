import { useRef,useEffect, useState } from "react"
import axios from 'axios'
import { Link } from "react-router-dom"

export default function ViewOrder() {
    const [orders, setOrders] = useState([])
    useEffect(() => {
        axios.get('/orders').then(({data}) => {
            setOrders(data)
        })
    }, [])

    function chkD(d) {
        if(!d) {
            return
        } else {
            return d.slice(0,10)
        }
    }

    return (
        <div className="grid lg:grid-cols-3 sm:grid-cols-2">
            {orders.length > 0 && orders.map(order => (
                <Link to={'/add/order/'+order._id} className="flex gap-4 m-4 bg-gray-100 p-4 rounded-2xl">
                    <div>
                        
                        <h2>Client Name: {order.clientName}</h2>
                        <h2>Driver Name: {order.driver}</h2>
                        <h2>Order Date: {chkD(order.orderDate)}</h2>
                        <h2>Net amount: {order.netAmount}</h2>
                       
                    </div>
                </Link>
            ))}
            
        </div>
    )
} 