
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Home from './pages/Home'
import Auth from './pages/Auth'
import './App.css';

function App() {
  return (
    <Router>

      <Routes>
        
        <Route path="/" element={<Home/>}/>
        <Route path="/auth" element={<Auth/>}/>
        <Route path="/*" element={<Home/>}/>
      </Routes>
    </Router>
  );
}

export default App;
