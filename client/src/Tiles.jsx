import { Navigate } from "react-router-dom"

export default function Tiles(props) {
    function test(e) {
        let reqPath = '/' + e.target.name+'/'+ props.name
        props.onChange(reqPath)
    }
    return (
        <div className="group text-center box-border h-60 max-w-sm border-4 bg-red-300 rounded-3xl">
            <div>
                {props.name}
            </div>
            <div className="hidden group-hover:block p-3">
                <button onClick={test} name="add" className="block w-full h-10 rounded-full mb-2">+ Add new</button>
                <button onClick={test} name="view" className="block w-full h-10 rounded-full mb-2">Preview old</button>
            </div>
        </div>
    )
}