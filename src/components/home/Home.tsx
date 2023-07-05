import { Link } from "react-router-dom"
import React,{useState,useEffect} from "react"
import NavBar from "../Navbar"
import Slider from "./Slider"
import AutoInsurance from "./AutoInsurance"
import Tabs from "../Tabs"
import ListBox from "./ListBox"
import Chart from "./Chart"
const lItem = [
    {name:'Mới nhất',value:1},
    {name:'Sự kiện',value:2},
    {name:'Khuyến mãi',value:3},
    {name:'Thông báo',value:4},
    {name:'Cộng đồng',value:5},
]
const Home:React.FC = () =>{
    const [choice,setChoice] = useState<Number>(1);
    const setchoice = (value:Number) => {
        setChoice(value);
    }
    return (
        <div>
            <NavBar/>
            <div>
                <Slider/>
                <AutoInsurance/>
                <div className="px-16">
                    <h2 className="title">Có gì mới trên MoMo?</h2>
                    <Tabs setchoice={setchoice} choice={choice} listchoice={lItem}/>
                    <div>
                        <ListBox/>
                    </div>
                </div>
                <div style={{padding:'32px'}} className="chart">
                    <Chart />
                </div>
            </div>
        </div>
    )
}
export default Home