import { Routes, Route, Router } from 'react-router'
import './style/tailwind.css';
import './style/main.css'
import Login from './Pages/Login'
import HomePage from "./Pages/HomePage"
 
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/homePage/*" element={<HomePage />}/>
      </Routes>
    </>
  );
}

export default App;
