import React,{useState,useEffect,useRef} from "react"
import styled from "styled-components"
const lItem = [
    {title:'Ghé Lotte Mart mua sắm - Bạn mới & bạn cũ ai cũng có quà hời giảm đến 20.000Đ!',date:'12/06/2023',img:'https://static.mservice.io/blogscontents/s770x370/momo-upload-api-230602165009-638213214099139527.jpg'},
    {title:'Ghé Lotte Mart mua sắm - Bạn mới & bạn cũ ai cũng có quà hời giảm đến 20.000Đ!',date:'12/06/2023',img:'https://static.mservice.io/blogscontents/s770x370/momo-upload-api-230602165009-638213214099139527.jpg'},
    {title:'Ghé Lotte Mart mua sắm - Bạn mới & bạn cũ ai cũng có quà hời giảm đến 20.000Đ!',date:'12/06/2023',img:'https://static.mservice.io/blogscontents/s770x370/momo-upload-api-230602165009-638213214099139527.jpg'},
    {title:'Bái bai tiền mặt - Ghé Coop, nhập mã ưu đãi CASHLESS, thanh toán MoMo giảm 20.000Đ với hóa đơn từ 1 triệu đồng!',date:'12/06/2023',img:'https://static.mservice.io/blogscontents/s770x370/momo-upload-api-230602165009-638213214099139527.jpg'},
    {title:'Nhịp cầu mới nối hai bờ vui cho bà con miền Tây',date:'06-06-2023',img:'https://static.mservice.io/blogscontents/s770x370/momo-upload-api-230602165009-638213214099139527.jpg'},
]
const StyleBox = styled.div`
width:25%;
padding:8px 8px;
box-sizing: border-box;
> div{
    display:flex;
    flex-direction:column;
    height:100%;
    box-shadow: 0 1px 4px 0 rgb(0 0 0 / 26%);
    border-radius:8px;
    cursor:pointer;
    .item-info{
        display:flex;
        flex:1;
        flex-direction:column;
        .title{
            flex:1;
            padding-bottom:10px;
            font-size:16px;
        }
    }
}
&:hover .title{
    color:var(--pink);
}
@media (max-width: 1200px) {
    width:33.33333%;
}
@media (max-width: 768px) {
    width:50%;
}
`
interface BoxProps{
    item:{title:String,date:String,img:String}
}
const Box = (props:BoxProps) =>{
    const {item} = props
    return (
        <StyleBox>
            <div>
                <div>
                    <div style={{paddingTop:'50%',position: 'relative',backgroundSize:'cover',backgroundImage:`url(${item.img})`}}></div>
                </div>
                <div className="px-16 item-info py-12">
                    <div className="title">{item.title}</div>
                    <div className="">
                        <span className="font-up mr-8">khuyến mãi</span>
                        <span>{item.date}</span>
                    </div>
                    
                </div>
            </div>
        </StyleBox>
    )
}

const ListBox:React.FC = () =>{
    return (
        <div style={{margin:'16 -8px',flexWrap:'wrap'}} className="flex mt-16">
            {lItem.map(item=>
                <Box item={item}/>
            )}
        </div>
    )
}
export default ListBox