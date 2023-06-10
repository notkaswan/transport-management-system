import { useRef,useEffect, useState } from "react"
import axios from 'axios'
import { Link } from "react-router-dom"
import {PDFExport, savePDF} from "@progress/kendo-react-pdf"

export default function ShowRecords() {
    const [orders, setOrders] = useState([])
    useEffect(() => {
        axios.get('/orders').then(({data}) => {
            setOrders(data)
        })
    },[])
    console.log(orders[1])
    function title(){
        let test = Object.keys(orders[1]).map(order => (<th scope="col">{order}</th>))
        return (
            <tr>
                {test}
            </tr>
            )
    }
    
    function records(record){
        let test = record.map(val => (<th scope="col">{val}</th>))
        return (
            <tr>
                {test}
            </tr>
            )
    }

    function chkD(d) {
        if(!d) {
            return
        } else {
            return d.slice(0,10)
        }
    }

    const pdfdown = useRef(null)

    const Handel =(event) =>{
        pdfdown.current.save();
    }

    return (
        <div>
            <button className="primary" onClick={Handel}> download</button>
            <div>
                {/* {records(orders)} */}
            <PDFExport ref={pdfdown}>
                <table className="table table-bordered">
                <thead>
                    {title()}
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    </tr>
                    <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    </tr>
                    <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                    </tr>
                </tbody>
                </table>
                </PDFExport>
            </div>
        </div>
    )
} 