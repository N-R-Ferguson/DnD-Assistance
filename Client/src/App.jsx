// import { useState } from 'react'
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DiceRoller from './components/DiceRoller';
import { Button } from '@mui/material';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <DiceRoller />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
