import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
const lItem = [
    {name:'Phí Bảo hiểm tốt nhất'},
    {name:'Báo giá từ các nhà Bảo hiểm hàng đầu'},
    {name:'Phí Bảo hiểm tốt nhất'},
    {name:'Phí Bảo hiểm tốt nhất'},
]
const lOption = [
    {url:'',name:'',img:''},
    {url:'',name:'',img:''},
]
const Section = styled.div`
padding: 2rem;
`
const SectionContent = styled.div`
background-color: rgb(243 228 231);
padding: 16px 24px;
border-radius:16px;
display: flex;
@media (max-width: 768px) {
    flex-direction: column;
}
.title{
    font-size: 24px;
    color: var(--gray-900);
}
.list-item{
    list-style: none;
    padding:0;
    .item{
        padding-bottom:16px;
        font-size:20px;
        color:var(--gray-900)
    }
    .item:not(:last-child):before{
        position: absolute;
        content:'';
        left: 12px;
        top: 0;
        width: 1px;
        height: 100%;
        background-color: var(--gray-500);
        }
        .item-dot{
            background-color: #fff;
            width: 25px;
            display:flex;
            align-items:center;
            justify-content:center;
            height: 25px;
            border-radius: 50%;
            z-index:100;
            .svg-icon{
                width:12px;
                height:12px;
            }
        }
}
`
const AutoInsurance:React.FC = () =>{
    return (
        <Section className="section">
            <SectionContent>
                <div className="flex-1 mr-8">
                    <div className="title">Mua Bảo hiểm Ô tô trên MoMo</div>
                    <ul className="list-item">
                        {lItem.map(item=>
                            <li className="item flex-center flex">
                                <div className="item-dot mr-8">
                                <svg enable-background="new 0 0 12 12" viewBox="0 0 12 12" x="0" y="0" className="svg-icon icon-checkbox-ticked shopee-checkbox__tick icon-tick-bold"><g><path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path></g></svg>
                                </div>
                            <div className="item-name">{item.name}</div>
                            </li>
                        )}
                    </ul>
                    <div className="listoption">
                        {lOption.map(item=>
                            <Link className="item option" to={item.url}>
                                <div>
                                    <img  alt={item.name} src={item.img}/>
                                </div>
                                <span>{item.name}</span>
                            </Link>
                        )}
                    </div>
                </div>
                <div className="flex-1">
                    <img width={`100%`} height={`100%`} src="https://static.mservice.io/img/momo-upload-api-230425115941-638180207817678809.jpeg" />
                </div>
            </SectionContent>
        </Section>
    )
}
export default AutoInsurance