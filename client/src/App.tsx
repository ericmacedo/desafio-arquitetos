import { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/home';
import User from './types/user';
import Login from './pages/login';

function App() {
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [logged, setLogged] = useState<boolean>(false);
    
  useEffect(() => {
    setUser(location.state?.user || null);
    
    return () => setLogged(location.state?.user !== null);
  }, [location]);
    
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={
          logged
            ? user && <Home
                        user={user}
                        onLogout={() => {
                          setUser(null);
                          setLogged(false);
                        }} />
            : <Navigate replace to='/login' />
        } />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
