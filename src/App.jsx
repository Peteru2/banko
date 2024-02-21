import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './Views/SignUp';

function App() {
 

  return (
    <>
      <section >
        <Router>
          <Routes>
            <Route path={'/SignUp'} element={<SignUp />} />
          </Routes>
        </Router>
        </section>
    </>
  )
}

export default App
