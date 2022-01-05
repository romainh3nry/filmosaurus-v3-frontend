import React from 'react';
import { Routes, Route } from "react-router-dom";
import { Home } from './Home';
import { Header } from './Header';
import { Movie } from './Movie';
import { Register } from './Register';

const API_BASE = 'https://filmosaurus-api.net/api/v1'

const App = () => {

  const [token, setToken] = React.useState<string | undefined>(undefined)
  console.log(token)

  return (
    <>
    <Header title='Filmosaurus' />
    <Routes>
      <Route path="/" element={<Home API_BASE={API_BASE}/>} />
      <Route path="movie/:movieId" element={<Movie API_BASE={API_BASE} />} />
      <Route path="accounts/register" element={<Register API_BASE={API_BASE} getToken={setToken} />} />
    </Routes>
    </>
  );
}

export default App;
