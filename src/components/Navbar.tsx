import { Link } from "react-router-dom"
import React,{useState,useEffect} from "react"
import { authStore } from "../zustand/auth"
const lItem = [
    {more:true,name:'Dịch vụ',items:[
        {name:'Chuyển - nhận tiền',info:'Miễn phí bảo mật chuyển trong 1s',src:'https://static.mservice.io/styles/desktop/images/tienich/icon1.svg'},
        {name:'Chuyển - nhận tiền',info:'Miễn phí bảo mật chuyển trong 1s',src:'https://static.mservice.io/styles/desktop/images/tienich/icon1.svg'},
        {name:'Thanh toán hóa đơn',info:'Miễn phí bảo mật chuyển trong 1s',src:'https://static.mservice.io/styles/desktop/images/tienich/icon3.svg'},
        {name:'Thanh toán hóa đơn',info:'Miễn phí bảo mật chuyển trong 1s',src:'https://static.mservice.io/styles/desktop/images/tienich/icon3.svg'},
        {name:'Thanh toán hóa đơn',info:'Miễn phí bảo mật chuyển trong 1s',src:'https://static.mservice.io/styles/desktop/images/tienich/icon3.svg'},
        {name:'Thanh toán hóa đơn',info:'Miễn phí bảo mật chuyển trong 1s',src:'https://static.mservice.io/styles/desktop/images/tienich/icon3.svg'},
    ]},
    {more:false,name:'Về Momo',items:[
        {name:'Thanh toán hóa đơn',info:'Miễn phí bảo mật chuyển trong 1s',src:'https://static.mservice.io/styles/desktop/images/tienich/icon3.svg'},
        {name:'Thanh toán hóa đơn',info:'Miễn phí bảo mật chuyển trong 1s',src:'https://static.mservice.io/styles/desktop/images/tienich/icon3.svg'},
        {name:'Thanh toán hóa đơn',info:'Miễn phí bảo mật chuyển trong 1s',src:'https://static.mservice.io/styles/desktop/images/tienich/icon3.svg'},
    ]},
    {more:false,name:'Tin tức',items:[
        {name:'Thanh toán hóa đơn',info:'Miễn phí bảo mật chuyển trong 1s',src:'https://static.mservice.io/styles/desktop/images/tienich/icon3.svg'},
    ]},
    {more:false,name:'Trợ giúp',items:[
        {name:'Thanh toán hóa đơn',info:'Miễn phí bảo mật chuyển trong 1s',src:'https://static.mservice.io/styles/desktop/images/tienich/icon3.svg'},
    ]},
    {more:false,name:'Đối tác',items:[
        {name:'Thanh toán hóa đơn',info:'Miễn phí bảo mật chuyển trong 1s',src:'https://static.mservice.io/styles/desktop/images/tienich/icon3.svg'},
    ]},
    {more:false,name:'Blog-momo',items:[
        {name:'Thanh toán hóa đơn',info:'Miễn phí bảo mật chuyển trong 1s',src:'https://static.mservice.io/styles/desktop/images/tienich/icon3.svg'},
    ]}
]
interface Child{
    src:String,info:String,name:String
}
interface ItemProps {
    item:{name:String,more:boolean,items:Child[]}
}
const ItemNavBar = (props:ItemProps) =>{
    const {item} = props
    const [show,setShow] = useState<boolean>(false)
    const setshow  = (value:boolean) =>{
        setShow(value)
    }
    return  (
        <div onMouseEnter={()=>setshow(true)} onMouseLeave={()=>setshow(false)} className={`item py-20 px-8 ${show?'is-active':''}`}>
            <div className="item__title flex">{item.name}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="icon ml-1 inline h-4 w-4 text-gray-500"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" className="jsx-ddfb0b416b0db288"></path></svg>
            </div>
            {show && (
            <div style={{width:`${item.more?890:280}px`}} className="drop-menu">
                <div className="menu-content">
                <div className={`listmenu ${item.more?'flex':''}`}>
                    {item.items.map((child,index)=>
                        <div className={`item ${item.more?'w-33':''}`} key={index}>
                            <div className="item__content">
                                <div className="item__img">
                                    <img className="w-full h-full" src={`${child.src}`} />
                                </div>
                                <div className="item__info">
                                    <div className="item__name">{child.name}</div>
                                    <div className="item__info_more">{child.info}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                </div>
                
            </div>)}
        </div>
    )
}

const ItemNavBarMobile = (props:ItemProps) =>{
    const {item} = props
    const [show,setShow] = useState<boolean>(false)
    const setshow  = (value:boolean) =>{
        setShow(value)
    }
    return  (
        <div onClick={()=>setshow(!show)} className={`item py-12 px-8 ${show?'is-active':''}`}>
            <div className="item__title w-full item-space flex">{item.name}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="icon ml-1 inline h-4 w-4 text-gray-500"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" className="jsx-ddfb0b416b0db288"></path></svg>
            </div>
            {show && (
            <div className="mobile">
                <div className="menu-content">
                <div className={`listmenu ${item.more?'flex':''}`}>
                    {item.items.map((child,index)=>
                        <div className={`item ${item.more?'w-33':''}`} key={index}>
                            <div className="item__content">
                                <div className="item__img">
                                    <img className="w-full h-full" src={`${child.src}`} />
                                </div>
                                <div className="item__info">
                                    <div className="item__name">{child.name}</div>
                                    <div className="item__info_more">{child.info}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                </div>
                
            </div>)}
        </div>
    )
}
const NavBar:React.FC = () =>{
    const {user,showMenuMobile,updateauthstate} = authStore();

    return(
        <>
        <nav className="navbar">
            <div className="flex flex-center navbar_content">
                <div className="">
                    <Link className="block" to={'/'}>
                        <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="jsx-ddfb0b416b0db288 svg-logo block h-10 w-10"><path d="M0 8C0 3.58172 3.58172 0 8 0H64C68.4183 0 72 3.58172 72 8V64C72 68.4183 68.4183 72 64 72H8C3.58172 72 0 68.4183 0 64V8Z" fill="#A50064" className="jsx-ddfb0b416b0db288"></path><path d="M51.859 10C45.6394 10 40.5057 15.0349 40.5057 21.3533C40.5057 27.5729 45.5407 32.7065 51.859 32.7065C58.0786 32.7065 63.2123 27.6716 63.2123 21.3533C63.2123 15.1337 58.1774 10 51.859 10ZM51.859 26.1908C49.1935 26.1908 47.0215 24.0188 47.0215 21.3533C47.0215 18.6877 49.1935 16.5158 51.859 16.5158C54.5246 16.5158 56.6965 18.6877 56.6965 21.3533C56.6965 24.0188 54.5246 26.1908 51.859 26.1908Z" fill="white" className="jsx-ddfb0b416b0db288"></path><path d="M28.7576 10C26.8818 10 25.1048 10.5923 23.6239 11.6783C22.2418 10.5923 20.4648 10 18.4903 10C13.7515 10 10 13.8502 10 18.4903V32.7065H16.5158V18.4903C16.5158 17.4043 17.4043 16.6145 18.3915 16.6145C19.4775 16.6145 20.2673 17.503 20.2673 18.4903V32.7065H26.7831V18.4903C26.7831 17.4043 27.6716 16.6145 28.6589 16.6145C29.7448 16.6145 30.5346 17.503 30.5346 18.4903V32.7065H37.0504V18.589C37.2479 13.8502 33.4963 10 28.7576 10Z" fill="white" className="jsx-ddfb0b416b0db288"></path><path d="M51.859 37.6427C45.6394 37.6427 40.5057 42.6776 40.5057 48.996C40.5057 55.2156 45.5407 60.3492 51.859 60.3492C58.0786 60.3492 63.2123 55.3143 63.2123 48.996C63.2123 42.6776 58.1774 37.6427 51.859 37.6427ZM51.859 53.7347C49.1935 53.7347 47.0215 51.5628 47.0215 48.8972C47.0215 46.2317 49.1935 44.0598 51.859 44.0598C54.5246 44.0598 56.6965 46.2317 56.6965 48.8972C56.6965 51.6615 54.5246 53.7347 51.859 53.7347Z" fill="white" className="jsx-ddfb0b416b0db288"></path><path d="M28.7576 37.6427C26.8818 37.6427 25.1048 38.235 23.6239 39.321C22.2418 38.235 20.4648 37.6427 18.4903 37.6427C13.7515 37.6427 10 41.4929 10 46.133V60.3492H16.5158V46.0342C16.5158 44.9483 17.4043 44.1585 18.3915 44.1585C19.4775 44.1585 20.2673 45.047 20.2673 46.0342V60.2505H26.7831V46.0342C26.7831 44.9483 27.6716 44.1585 28.6589 44.1585C29.7448 44.1585 30.5346 45.047 30.5346 46.0342V60.2505H37.0504V46.133C37.2479 41.3942 33.4963 37.6427 28.7576 37.6427Z" fill="white" className="jsx-ddfb0b416b0db288"></path></svg>
                    </Link>
                </div>
                <div className="navbar__listmenu flex-1 item-centers">
                    {lItem.map((item,index)=>
                        <ItemNavBar key={index} item={item}/>
                    )}
                </div>
                <div className="search__wrapper">
                    <form className="form">
                        <div className="search__content relative">
                            <input placeholder="Bạn tìm gì ..." className="search__input"/>
                            <button className="btn btn--search">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="jsx-b3e1b6a7c9b96113 icon w-5 h-5 "><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" className="jsx-b3e1b6a7c9b96113"></path></svg>
                            </button>
                        </div>
                    </form>
                </div>
                <div className="">
                    <div onClick={()=>updateauthstate({showMenuMobile:!showMenuMobile})} className="mobile-menu__button">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="jsx-265efa4f963d66f6 icon-menu h-7 w-7"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={`${showMenuMobile?'M6 18L18 6M6 6l12 12':'M4 6h16M4 12h16M4 18h16'}`} className="jsx-265efa4f963d66f6"></path></svg>
                    </div>
                </div>
            </div>
        </nav>
        {showMenuMobile && (
            <div className="mobile-wrapper">
                <div className="mobile list_menu">
                    {lItem.map((item,index)=>
                        <ItemNavBarMobile key={index} item={item}/>
                    )}
                </div>
            </div>
        )}
        </>
    )
}
export default NavBar