import React from 'react';
import { Routes, Route } from "react-router-dom";
import { Home } from './Home';
import { Header } from './Header';
import { Movie } from './Movie';

const API_BASE = 'https://filmosaurus-api.net/api/v1'

const App = () => {

  return (
    <>
    <Header title='Filmosaurus' />
    <Routes>
      <Route path="/" element={<Home API_BASE={API_BASE}/>} />
      <Route path="movie/:movieId" element={<Movie />} />
    </Routes>
    </>
  );
}

export default App;
