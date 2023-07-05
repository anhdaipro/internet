import React,{useState,useEffect,useRef,useMemo} from "react"
import axios from "axios"
import { countryURL, maxValueURL, resultURL } from "../../urls";
import styled,{ css, keyframes } from "styled-components"
interface Result {
    year:number,value:number,index:number
}
interface Item{
    name:String,img:String, background:String,result:Result[]
}
export const formatter=(number:number)=>{
    const str =number.toString()
       return str.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
const rotate = (a:number,b:number) => keyframes`
0% {
    --num: ${a};
}
100% {
    --num: ${b};
}
`
const Number = styled.div<{a:number,b:number}>`
animation-duration: 2000ms;
animation-name: ${props => (css`${rotate(props.a,props.b)}`)};
counter-set: num var(--num);
&:after{
    content: counter(num) ;
}
`
interface ChildProps{
    num1:number,
    num2:number,
    complete:boolean,
    no:number,
    index:number,
    length:number
}
const Value  = (props:ChildProps)=>{
    const {num1,num2,complete,no,index,length} = props
    const previousTimeRef = useRef<any>()
    const [number,setNumber] =  useState<number>(0)
    const timerId = useRef<any>()
    useEffect(() => {
        const speed = 1/(num2-num1)
        const  incNbrRec = () =>{
            if (num1 <= num2 && !complete) {
              setTimeout(function() {//Delay a bit before calling the function again.
                setNumber(num1+1)
              }, speed);
            }
        }
        incNbrRec()
        // const animate = (time:any) => {
        //     if(!complete){
        //         if (previousTimeRef.current) {
        //             const deltaTime = time - previousTimeRef.current;
        //         // Pass on a function to the setter of the state
        //         // to make sure we always have the latest state
        //             const progress = index == length -1 ? 0 : (Math.min((deltaTime)/100, 1));
        //             setNumber(Math.floor(progress * (num2 - num1) + num2))
        //             console.log(progress)
        //         }
        //         previousTimeRef.current = time;
        //         timerId.current = requestAnimationFrame(animate);
        //     }
        // }
        // timerId.current = requestAnimationFrame(animate)
        // return () => cancelAnimationFrame(timerId.current)
  }, [complete,previousTimeRef,timerId,index,length])
  console.log(number)
  return (
    <div style={{marginLeft:'4px',transform:`translateY(${no*28}px)`,}}>{formatter(number)}</div>
  )
}
const Chart:React.FC = () =>{
    const [index,setIndex] = useState<number>(0);
    const [lItem,setLItem] =useState<any>([])
    const [max,setMax] = useState<number>(0)
    const [complete,setComplete] =useState<boolean>(false)
    const length = useMemo(()=>{
        return  lItem.length > 0 ? lItem[0].result.length : 0
    },[lItem.length]) 
    useEffect(()=>{
        if(index && index == length-1){
            setTimeout(()=>{
                setComplete(true)
            },1000)
           
        }
    },[index,length])
    useEffect(()=>{
        ( async ()=>{
            const [res1,res2,res3] = await  axios.all([
                axios.get(countryURL),
                axios.get(resultURL),
                axios.get(maxValueURL)
            ])
            const data = res1.data.map((item:any)=>{
                return {...item,result:res2.data.filter((pro:any)=>pro.country_id==item.id)}
            })
            data.sort((a:any,b:any)=>{
                return b.result[0].value - a.result[0].value;
            })
            const lItemData = data.map((item:any,index:number)=>{
                return {...item,result:item.result.map((pro:any,i:number)=>{
                    if(i==0){
                        return {...pro,index:index}
                    }
                    return {...pro,}
                })}
            })
            setLItem(lItemData)
            setMax(res3.data.max)
            console.log(res3.data)
        })()
        
    },[])
    const maxValue = useMemo(()=>{
        const lResultItemNew = lItem.reduce((a:any,b:any)=>{
            return [...a,{...b.result[index],name:b.name}]
        },[])
        lResultItemNew.sort((a:any,b:any)=>{
            return b.value - a.value;
        })
        return index ? lResultItemNew[0].value : 0
    },[index])
    
    const listrow = useMemo(()=>{
        const lengthValue = maxValue.toString().length
        if(Math.round(maxValue/Math.pow(10,(lengthValue-1))) > 8){
            return [Math.pow(10,(lengthValue-1))*2,Math.pow(10,(lengthValue-1))*4,Math.pow(10,(lengthValue-1))*6,Math.pow(10,(lengthValue-1))*8]
        }
        else if(Math.round(maxValue/Math.pow(10,(lengthValue-1))) > 6 && Math.round(maxValue/Math.pow(10,(lengthValue-1))) <= 8){
            return [Math.pow(10,(lengthValue-1))*2,Math.pow(10,(lengthValue-1))*4,Math.pow(10,(lengthValue-1))*6]
        }
        else if(Math.round(maxValue/Math.pow(10,(lengthValue-1))) > 4 && Math.round(maxValue/Math.pow(10,(lengthValue-1))) <= 6){
            return [Math.pow(10,(lengthValue-1))*2,Math.pow(10,(lengthValue-1))*4]
        }
        else if(Math.round(maxValue/Math.pow(10,(lengthValue-1))) <= 4 && Math.round(maxValue/Math.pow(10,(lengthValue-1))) > 1){
            if(Math.floor(maxValue/Math.pow(10,(lengthValue-1))) == 1){
                return [Math.pow(10,(lengthValue-1))*0.5,Math.pow(10,(lengthValue-1))*1,Math.pow(10,(lengthValue-1))*1.5]
            }
            return [Math.pow(10,(lengthValue-1)),Math.pow(10,(lengthValue-1))*2,Math.pow(10,(lengthValue-1))*3,Math.pow(10,(lengthValue-1))*4]
        }
        else{
            return [Math.pow(10,(lengthValue-1))/2,Math.pow(10,(lengthValue-1))]
        }
        
    },[maxValue])   
    const lNew = useMemo(()=>{
        const lResultItemNew = lItem.reduce((a:any,b:any)=>{
            return [...a,{...b.result[index],name:b.name}]
        },[])
        lResultItemNew.sort((a:any,b:any)=>{
            return b.value - a.value;
        })
        const lItemNew = lItem.map((item:any)=>{
            return {...item,result:item.result.map((pro:any,i:number)=>{
                if(i==index){
                    return {...pro,index:lResultItemNew.findIndex((u:any)=>u.name == item.name)}
                }
                return {...pro}
            })}
        })
        return lItemNew
    },[index])
    useEffect(()=>{
        const timer = setInterval(()=>{
            if(length>0){
            const indexchoice = index < length-1 ? index+1 : length-1
            setIndex(indexchoice)
        }
        },2000)
        return () => clearInterval(timer)
    },[index,length])
    return (
        <div>
            <div style={{marginLeft:'108px',position:'relative',marginBottom:'4px'}} className="flex">
            {lNew.length > 0 ?
            <>
                {listrow.map(item=>
                    <div key={item}>
                        <div style={{transform: 'translate(-50%,0)',transition: 'all 1s ease',position:'absolute',left:`${item/maxValue*70}%`,bottom:'100%'}} className="flex-1">{formatter(item)}</div>
                        <div style={{transform: 'translate(-50%,0)',transition: 'all 1s ease',position:'absolute',left:`${item/maxValue*70}%`,top:'100%',height:'4px',width:'0.5px',background:'black'}} className="flex-1"></div>
                    </div>
                    
                )}
                </>:''}
            </div>
            
            {lNew.length > 0 ?
            <>
            {lNew.map((item:any)=>{
                const no = index > 0 && index <= length-1 ? item.result[index].index - item.result[0].index : 0
                const a = item.result[index-1].value
                const b = item.result[index].value
                return (
                    <div className="flex" key={`${item.name}`} style={{position:'relative',height:'26px',marginTop:'2px',}}>
                        
                        <div style={{transform:`translateY(${no*28}px)`,transition: 'all 1s ease',textAlign:'end',width:'100px',marginRight:'8px'}}>{item.name}</div>
                        <div className="flex flex-center flex-1" style={{height:'100%'}}>
                            <div style={{height:'100%',transform:`translateY(${no*28}px)`,transition: 'all 1s ease',background:`${item.background}`,width:`${70*item.result[index].value/maxValue}%`}} className=" item-coutry"></div>
                            <img src={`${item.image}`} style={{transform:`translateY(${no*28}px)`,transition: 'all 1s ease',marginLeft:'4px'}} alt="" height='20' />
                            <Value length = {length} index ={index} no ={no} num1={a} num2={b} complete={complete}></Value>
                        </div>
                        
                    </div>
                )
            }
            )}
            <div style={{transition: 'all 1s ease'}} className="mt-16 chart-title flex items-center">Năm {lNew[0].result[index].year}</div>
        </>:''}
        </div>
    )
}
export default Chart
