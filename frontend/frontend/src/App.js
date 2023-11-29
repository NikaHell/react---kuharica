import React from 'react';
import './App.css';
import Navbar from './components/navbar/navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pocetna from './pages/Pocetna';
import JelaComp from './pages/Jela';
import Profil from './pages/profil';
import Postavke from './pages/postavke';
import Login from './pages/login';
import FormaJela from './components/jela/kreirajJelo';
import Detalji from './components/jela/detalji'
import editJelo from './components/jela/editJelo'
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/'  element={<Pocetna/>} />
          <Route path='/jela' element={<JelaComp/>} />
          <Route path='/profil' element={<Profil/>} />
          <Route path='/postavke' element={<Postavke/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/dodaj" element={<FormaJela />} />
          <Route path="/detalji/:id" element={<Detalji />} />
          <Route path="/editJelo/:id" element={<editJelo />} />
         
        </Routes>
      </Router>
     
    </>
  );
}

export default App;