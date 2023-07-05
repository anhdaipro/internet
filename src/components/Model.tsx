import React  from "react";
import { authStore } from "../zustand/auth";
const lItem = [
    {}
]
const Modal:React.FC = () =>{
    const {user} = authStore()
    return (
        <div>

        </div>
    )
}
export default Modal