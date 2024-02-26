import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './Views/SignUp';
import Login from './Views/Login';
import Dashboard from './Views/Dashboard';
import TransPinForm from './component/DashComp/TransPinForm';
import "./style.css"

function App() {
 

  return (
    <>
      <section >
        <Router>
          <Routes>
          <Route path={'/'} element={<Dashboard />} />
            <Route path={'/SignUp'} element={<SignUp />} />
            <Route path={'/Login'} element={<Login />} />
            <Route path={'/Trans'} element={<TransPinForm />} />

          </Routes>
        </Router>
        </section>
    </>
  )
}

export default App
