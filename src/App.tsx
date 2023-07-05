import React from 'react';
import logo from './logo.svg';
import './App.css';
import './css/main.css'
import './css/main.scss'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Home from './components/home/Home';
import Layout from './components/Layout';
import Chart from './components/home/ChartInternet';
const AppStore:React.FC = () =>{
  return(
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route  path="/" element={<Chart/>}/>
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
export default AppStore;
