import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './Views/SignUp';
import Login from './Views/Login';
import Dashboard from './Views/Dashboard';
import "./style.css"
import AuthContextProvider from "./component/AuthContext"
import Deposits from './component/sidebar/Deposits';
import History from './component/sidebar/History';



function App() {

  return (
      <>     
     
      
     
        <Router>
          <AuthContextProvider>
            <Routes>
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/Deposits" element={<Deposits />} />
              <Route path="/History" element={<History />} />


            </Routes>
        </AuthContextProvider>

        </Router>
      </>

  );
}

export default App;
