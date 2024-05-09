import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import SignUp from './Views/SignUp';
import Login from './Views/Login';
import Dashboard from './Views/Dashboard';
import "./style.css"
import AuthContextProvider from "./component/AuthContext"


function App() {

  return (
      <>     
     
      
     
        <Router>
          <AuthContextProvider>
            <Routes>
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/" element={<Dashboard />} />
             
            </Routes>
        </AuthContextProvider>

        </Router>
      </>

  );
}

export default App;
