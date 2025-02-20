import React from "react";
import { Route, Routes} from 'react-router-dom';
import { Header } from "./components/Header/header";
import { Footer } from "./components/Footer/footer";
import {Home} from './pages/Homepage'
import { Revenue } from "./pages/Revenue";
import { Expense } from "./pages/Expenses";
import {Report} from "./pages/Report"
export default function App() {
  
  return (
    <div className="overflow-x-hidden">
    <Header/>
    <Routes>
       <Route path="/" element={<Home/>}/>
      <Route path="/revenue" element={<Revenue/>}/> 
      <Route path="/expenses" element={<Expense />}/>
      <Route path="/reports" element={<Report />}/> 
    </Routes>
    <Footer/>
    </div>
  );
}


