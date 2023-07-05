import React,{useEffect,useState,useRef,useMemo} from "react";
const lItem = [
    'https://static.mservice.io/img/momo-upload-api-230404161228-638162215484922447.jpg',
    'https://static.mservice.io/img/momo-upload-api-230522121140-638203543005513218.jpg',
    'https://static.mservice.io/img/momo-upload-api-230404161228-638162215484922447.jpg',
    'https://static.mservice.io/img/momo-upload-api-230522121140-638203543005513218.jpg',
    'https://static.mservice.io/img/momo-upload-api-230404161228-638162215484922447.jpg',
    'https://static.mservice.io/img/momo-upload-api-230522121140-638203543005513218.jpg',
    'https://static.mservice.io/img/momo-upload-api-230404161228-638162215484922447.jpg',
    'https://static.mservice.io/img/momo-upload-api-230522121140-638203543005513218.jpg',

]
const Slider:React.FC = () =>{
    const [slideActive,setSlideActive] = useState(0)
    const [drag,setDrag] = useState(false)
    const [start,setStart] = useState(0)
    const [end,setEnd] = useState(0)
    let w = window.innerWidth;
    const percent = useMemo(()=>{
        return !drag ? 0 : end-start > 0 ? (end-start)/w : (-end+start)/w
    },[slideActive,end,start,drag])
    const sliderRef = React.useRef<HTMLDivElement>(null);
    useEffect(()=>{
        const timer = setInterval(()=>{
            const slideChoice = slideActive == lItem.length-1 ? 0 : slideActive + 1
            setSlideActive(slideChoice)
        },3000)
        return () => clearInterval(timer)
    },[slideActive])
    const setslide = (value:number) =>{
        const slideChoice = value == lItem.length ? 0 : value <= 0 ? lItem.length - 1 : value
        setSlideActive(slideChoice)
    }
    // useEffect(()=>{
    //     const setprogess = (e:any) =>{
    //         if(drag){
    //             const clientX=e.clientX
    //             console.log(clientX)
    //             setEnd(clientX)
    //         }
    //     }
    //     document.addEventListener('mousemove',setprogess)
    //     return ()=>{
    //         document.removeEventListener('mousemove',setprogess)
    //     }
    // },[drag])
    // useEffect(()=>{
    //     const setendprogess = (e:any) =>{
    //         if(drag){
    //             setDrag(false)
    //             setEnd(0)
    //             setStart(0)
    //         }
    //     }
    //     document.addEventListener('mouseup',setendprogess)
    //     return ()=>{
    //         document.removeEventListener('mouseup',setendprogess)
    //     }
    // },[drag])
   
    return (
        <div onMouseDown={(e)=>{
            setDrag(true)
            const clientX=e.clientX
            console.log(clientX)
            setStart(clientX)
            }}  className="wrapper-slider">
            <div ref={sliderRef}  className="container-slider" style={{width:`${lItem.length*100}%`,transition:`all 590ms ease 0s`,transform:`translate3d(-${slideActive*(100/lItem.length)-percent*100/lItem.length}%, 0px, 0px)`}}>
                {lItem.map((item,index)=>
                    <div style={{width:`${100/lItem.length}%`}} key={index} className={`slider ${slideActive == index ? 'active':''}`}>
                        <div className="full-home-banners__main-banner-image yM9KRq" style={{paddingTop:`40%`,backgroundImage: `url(${item})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}></div>
                    </div>
                )}
            </div>
            <div className="dot-wrapper">
                <div className="dot-list">
                    {lItem.map((item,index)=><div className={`dot ${slideActive == index ? 'active' : ''}`}></div>)}
                </div>
            </div>
            <button onClick={()=>setslide(slideActive-1)} className="arrow-left">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="jsx-974c4914c5fc1860  h-6 w-6 md:h-7 md:w-7"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" className="jsx-974c4914c5fc1860"></path></svg>
                </button>
                <button onClick={()=>setslide(slideActive+1)} className="arrow-right">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="jsx-974c4914c5fc1860  h-6 w-6 md:h-7 md:w-7"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" className="jsx-974c4914c5fc1860"></path></svg>
                </button>
        </div>
    )
}
export default Slider