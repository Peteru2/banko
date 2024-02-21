import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Views/Login';

function App() {
 

  return (
    <>
      <section >
        <Router>
          <Routes>
            <Route path={'/SignUp'} element={<Login />} />
          </Routes>
        </Router>
        </section>
    </>
  )
}

export default App
