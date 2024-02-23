import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './Views/SignUp';
import Login from './Views/Login';
import Dashboard from './Views/Dashboard';
import "./style.css"

function App() {
 

  return (
    <>
      <section >
        <Router>
          <Routes>
          <Route path={'/'} element={<Dashboard />} />
            <Route path={'/SignUp'} element={<SignUp />} />
            <Route path={'/Login'} element={<Login />} />\
          </Routes>
        </Router>
        </section>
    </>
  )
}

export default App
