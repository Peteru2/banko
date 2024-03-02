import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './Views/SignUp';
import Login from './Views/Login';
import Dashboard from './Views/Dashboard';
import TransactionForm from './component/DashComp/TransactionForm';
import "./style.css"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/Transfer" element={<TransactionForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
