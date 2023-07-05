import React,{useState,useRef,useEffect}  from "react";
import styled from "styled-components";
export const Stylediv1=styled.ul`
box-shadow: rgb(0 0 0 / 5%) 0px 1px 1px 0px;
background-color: rgb(255, 255, 255);
margin: 0px;
padding: 0px;
border-bottom: 1px solid rgba(0,0,0,.09);
display: flex;
justify-content:center
`
export const Stylecontent=styled.div`
width:1200px;
margin-left:auto;
margin-right:auto

`
const Tab=styled.li<{hide:boolean}>`
display: flex;
min-width:6rem;
font-weight: 400;
font-family: -apple-system,Helvetica Neue,Helvetica,Roboto,Droid Sans,Arial,sans-serif;
font-size: 16px;
padding:0;
justify-content: center;
align-items: center;
cursor:pointer;
color:#333;
&:hover{
    color:#ee4d2d;
}
&.active{
    color:#ee4d2d;
}
`
const Tabdiv=styled.div<{visiale:boolean,hide:boolean}>`
    overflow: ${props=>props.visiale?'':'hidden'};
    text-overflow: ellipsis;
    white-space: nowrap;
    position: relative;
    width: 100%;
    height:100%;
    padding: 1.1875rem 0.625rem;
    text-align: center;
    text-transform: capitalize;
    font-size: 1rem;
    box-sizing: border-box;
&::before{
    position:absolute;
    width:100%;
    content:'';
    height:3px;
    background-color:#ee4d2d;
    left:0;
    bottom:0;
    opacity:0
}
&:hover{
    color:#ee4d2d
}
&.tab-active:before{
    opacity:1
}
`
const ListItem=styled.div`
display:flex;
flex-wrap:wrap;
margin: 0.5625rem -0.375rem 6.25rem;
`
const Item=styled.div`
width:20%;
padding:4px;
&:hover .item{transform:translateY(-1px);
    box-shadow: 0.0625rem 0.125rem 0.125rem 0.0625rem rgb(0 0 0 / 10%)
}
.item {
    background-color:#fff;
    box-shadow: 0 0.0625rem 0.125rem 0 rgb(0 0 0 / 10%);
    border-radius: 0.125rem;
    cursor:pointer
}
`
const StyleListDrop=styled.div`
display:flex;
flex-wrap:wrap;
width:25.625rem;
padding:4px 12px;
box-shadow: 0 1px 4px 0 rgb(0 0 0 / 26%);
box-sizing:border-box;
background-color:#fff
`
const StyleitemDrop=styled.span<{active:boolean}>`
overflow: hidden;
display: -webkit-box;
text-overflow: ellipsis;
word-wrap: break-word;
white-space:nowrap;
padding:0.625rem 0;
width:11.25rem;
color:${props=>props.active?'#ee4d2d':'#333'};
&:hover{
    color:#ee4d2d
}
`
const ArrowTop=styled.div<{right:String}>`
position:absolute;
border-left:10px solid transparent;
border-right:10px solid transparent;
border-bottom:10px solid #fff;
right:${props=>`${props.right}`}px;
width:0;
height:0;
filter:drop-shadow(0 -2px 2px rgba(0,0,0,.05));
top:-10px
`
const DropdowContent=styled.div`
width:100%;
cursor:pointer
`
interface Item{
    value:Number,
    name:String
}
interface TabProps{
    choice:Number,
    setchoice: (data:Number)=>void,
    listchoice: Item[]
}
const Tabs = (props:TabProps) =>{
    const {listchoice,setchoice,choice} = props
    return (
        <Stylediv1>
            {listchoice.map((item,i)=>
                <Tab onClick={(e)=>setchoice(item.value)} hide key={i} className={`${item.value == choice?'active':''}`}>
                    <Tabdiv visiale hide className={`${item.value == choice?'tab-active':''}`}>{item.name}</Tabdiv>
                </Tab>
            )}
        </Stylediv1>
    )
}
export default Tabs