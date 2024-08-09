import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import { Spotify } from './components/Spotify';
import { DashBoard } from './components/DashBoard';
import { useStateProvider } from './utils/StateProvider';
import { reducerCases } from './utils/Constants';
import ProfileDashBoard from './components/ProfileDashBoard';
import SearchDashBoard from './components/SearchDashBoard';
import NotFound from './components/NotFound';

function App() {
  const [{ token }, dispatch] = useStateProvider();

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (hash) {
      token = hash.substring(1).split("&")[0].split("=")[1];
      window.localStorage.setItem("token", token);
    }

    if (token) {
      dispatch({ type: reducerCases.SET_TOKEN, token });
    }

    window.location.hash = "";
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<DashBoard />} />
        <Route path='/playlist' element={<Spotify />} />
        <Route path='/search' element={<SearchDashBoard />} />
        <Route path='/profile' element={<ProfileDashBoard />} />
        <Route path='/playlist/:id' element={<DashBoard />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
