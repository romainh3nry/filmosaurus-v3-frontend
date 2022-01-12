import React from 'react';
import { Routes, Route } from "react-router-dom";
import { Home } from './Home';
import { Header } from './Header';
import { Movie } from './Movie';
import { Register } from './Register';
import { useCookies } from 'react-cookie';
import { LogOut } from './LogOut';
import { Login } from './Login';
import { Account } from './Account';


const API_BASE = 'https://filmosaurus-api.net/api/v1'

const App = () => {

  const [token, setToken] = React.useState<string | undefined>(undefined)
  const [cookies, setCookie, removeCookie] = useCookies(['auth-token']);

  const handleLogin = () => {
    setCookie('auth-token', token, {path: '/', maxAge: 86400})
  }

  React.useEffect(() => {
    if (token !== undefined && !cookies["auth-token"]) {
      handleLogin();
    }
  }, [token])

  return (
    <>
    {cookies["auth-token"] 
      ? (<Header isAthenticated={true} title='Filmosaurus'/>)
      : <Header isAthenticated={false} title='Filmosaurus'/>}
    <Routes>
      <Route path="/" element={<Home API_BASE={API_BASE}/>} />
      <Route path="movie/:movieId" element={<Movie token={token} API_BASE={API_BASE} />} />
      <Route path="accounts/register" element={<Register API_BASE={API_BASE} getToken={setToken} />} />
      <Route path="accounts/logout" element={<LogOut removeCookie={removeCookie} setToken={setToken} />} />
      <Route path="accounts/login" element={<Login getToken={setToken} API_BASE={API_BASE} />} />
      <Route path="account/" element={<Account />}/>
    </Routes>
    </>
  );
}

export default App;
