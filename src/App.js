import React from "react";
import { Route, Routes} from 'react-router-dom';
import {Home} from './components/Homepage'
import { Revenue } from "./components/Revenue";
import { Expense } from "./components/Expenses";
import {Report} from "./components/Report"
export default function App() {
  
  return (
    <Routes>
       <Route path="/" element={<Home/>}/>
      <Route path="/revenue" element={<Revenue/>}/> 
      <Route path="/expenses" element={<Expense />}/>
      <Route path="/reports" element={<Report />}/> 
    </Routes>
  );
}


