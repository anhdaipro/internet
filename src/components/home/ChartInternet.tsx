import React,{useState,useEffect,useRef,useMemo} from "react"
import axios from "axios"
import { countryInternetURL, maxValueInternetURL, resultInternetURL } from "../../urls";
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
animation-duration: 1000ms;
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
    i:number,
    length:number
}
const height = 28;
const number_display = 10
const Value  = (props:ChildProps)=>{
    const {num1,num2,complete,no,index,length,i} = props
    const previousTimeRef = useRef<any>()
    const [number,setNumber] =  useState<number>(num1)
    useEffect(() => {
    	setNumber(num1)
    },[num1])
    const [progress,setProgress] = useState<number>(0)
    const timerId = useRef<any>()
    useEffect(() => {
        const speed = (num2-num1)/10
        if(!complete){
        timerId.current = setInterval(() =>{
                setNumber((t:number) => {
                    return index == length -1 ? num2 : t+speed;
                  });
        }, 200);
        return () => clearInterval(timerId.current)
        }
        
        // const animate = (time:any) => {
        //     if(!complete){
        //         if (previousTimeRef.current) {
        //             const deltaTime = time - previousTimeRef.current;
        //             // Pass on a function to the setter of the state
        //             // to make sure we always have the latest state
        //             setNumber((prev:number)=>{return prev + deltaTime/1000 * (num2-num1)})
        //             console.log(deltaTime)
        //         }
        //         previousTimeRef.current = time;
        //         timerId.current = requestAnimationFrame(animate);
        //     }
        // }
        // timerId.current = requestAnimationFrame(animate)
        // return () => cancelAnimationFrame(timerId.current)
  }, [complete,num2,num1,number])
 
  return (
    <div style={{marginLeft:'4px'}}>{formatter(Math.round(number))}</div>
  )
}
const Chart:React.FC = () =>{
    const [index,setIndex] = useState<number>(0);
    const [lItem,setLItem] =useState<any>([])
    const [max,setMax] = useState<number>(0)
    const [complete,setComplete] =useState<boolean>(false)
    const timerId = useRef<any>()
    const length = useMemo(()=>{
        return  lItem.length > 0 ? lItem[0].result.length : 0
    },[lItem.length]) 
    useEffect(()=>{
        const timer = setTimeout(()=>{
            if(index && index == length-1){
                setComplete(true)
            }
        },2000)
           
       return ()=>clearTimeout(timer)
    },[index,length])
    
    useEffect(()=>{
        ( async ()=>{
            const [res1,res2,res3] = await  axios.all([
                axios.get(countryInternetURL),
                axios.get(resultInternetURL),
                axios.get(maxValueInternetURL)
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
         
        })()
        
    },[])
    const itemMax = useMemo(()=>{
        if(length>0){
            const lResultItemNew = lItem.reduce((a:any,b:any)=>{
                return a.result[index].value <=  b.result[index].value ? b : a
            })
            return lResultItemNew
        }
    },[index,length])
    console.log(itemMax)
    const maxValue = useMemo(()=>{
        const lResultItemNew = lItem.reduce((a:any,b:any)=>{
            return [...a,{...b.result[index],name:b.name}]
        },[])
        lResultItemNew.sort((a:any,b:any)=>{
            return b.value - a.value;
        })
        return length ? lResultItemNew[0].value : 0
    },[index,length])
    
    const listrow = useMemo(()=>{
        const lengthValue = maxValue.toString().length
        if(Math.round(maxValue/Math.pow(10,(lengthValue-1))) > 8){
            return [0,Math.pow(10,(lengthValue-1))*2,Math.pow(10,(lengthValue-1))*4,Math.pow(10,(lengthValue-1))*6,Math.pow(10,(lengthValue-1))*8]
        }
        else if(Math.round(maxValue/Math.pow(10,(lengthValue-1))) > 6 && Math.round(maxValue/Math.pow(10,(lengthValue-1))) <= 8){
            return [0,Math.pow(10,(lengthValue-1))*2,Math.pow(10,(lengthValue-1))*4,Math.pow(10,(lengthValue-1))*6]
        }
        else if(Math.round(maxValue/Math.pow(10,(lengthValue-1))) > 4 && Math.round(maxValue/Math.pow(10,(lengthValue-1))) <= 6){
            return [0,Math.pow(10,(lengthValue-1))*2,Math.pow(10,(lengthValue-1))*4]
        }
        else if(Math.round(maxValue/Math.pow(10,(lengthValue-1))) <= 4 && Math.round(maxValue/Math.pow(10,(lengthValue-1))) > 1){
            if(Math.floor(maxValue/Math.pow(10,(lengthValue-1))) == 1){
                return [0,Math.pow(10,(lengthValue-1))*0.5,Math.pow(10,(lengthValue-1))*1,Math.pow(10,(lengthValue-1))*1.5]
            }
            const count_number = Math.ceil(maxValue/Math.pow(10,(lengthValue-1)))
            return Array.from({length: count_number}, (_, i) => i*Math.pow(10,(lengthValue-1)))
        }
        else{
            return [0,Math.pow(10,(lengthValue-1))/2,Math.pow(10,(lengthValue-1))]
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
    },[index,lItem])
    
    useEffect(()=>{
    	if(length>0){
		timerId.current = setInterval(()=>{
		    const indexchoice = index < length-1 ? index+1 : length-1
		    setIndex(indexchoice)
		},2000)
       }
        return () => clearInterval(timerId.current)
    },[index,length])
    return (
        <div style={{padding:'40px',}}>
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
            <div style={{overflow:'hidden',position:'relative',height:`${height*number_display}px`}}>
            {itemMax ? <div style={{position:'absolute',left:'70%',top:'50%',transition:'all 1s ease'}}>
                <img src={`${itemMax.image}`} style={{marginLeft:'4px'}} alt="" height='80' />
            </div>:''}
            {lNew.length > 0 ?
            <>
            {lNew.map((item:any,i:number)=>{
                const no = index > 0 && index <= length-1 ? item.result[index].index - item.result[0].index : 0
                const a = index == 0 ? item.result[index].value : item.result[index-1].value
                const b = item.result[index].value
                const indexvalue = item.result[index].index
                    return (
                        <div className="flex" key={`${item.name}`} style={{width:'100%',position:'absolute',top:`${height*i}px`,height:'28px',transform:`translateY(${no*height}px)`,transition: 'all 2s ease',}}>
                            <div style={{textAlign:'end',width:'100px',marginRight:'8px'}}>{item.name}</div>
                            <div className="flex flex-center flex-1" style={{height:'26px',}}>
                                <div style={{height:'100%',background:`${item.background}`,width:`${70*item.result[index].value/maxValue}%`,transition: 'width 2s ease'}} className=" item-coutry"></div>
                                <img src={`${item.image}`} style={{marginLeft:'4px'}} alt="" height='20' />
                                <Value i={i} length = {length} index ={index} no ={no} num1={a} num2={b} complete={complete}></Value>
                            </div>
                            
                        </div>
                    )
            })}
            
        </>:''}
        </div>
            {lNew.length > 0  ? <div className="flex items-center mt-16">Năm {lNew[0].result[index].year}</div>:''}
        </div>
        
    )
}
export default Chart
