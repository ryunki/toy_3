
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Auth from './pages/Auth'
import MainBoard from './pages/MainBoard'
// import ProtectedRoutes from './components/ProtectedRoutes'

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Auth/>}/>
        {/* <Route path="/auth" element={<Auth/>}/> */}
        {/* <Route element={<ProtectedRoutes/>}> */}
          <Route path="mainboard" element={<MainBoard/>}/>
        {/* </Route> */}
        <Route path="*" element={<Auth/>}/>
      </Routes>
    </Router>
  );
}

export default App;
