import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SummonerPage from './pages/SummonerPage';
import './App.css';

var vh = 0;

function App() {
  useEffect(() => {
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, []);

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/summoner/:summonerName' element={<SummonerPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
