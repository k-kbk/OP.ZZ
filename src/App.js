import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SummonerPage from './pages/SummonerPage';
import './App.css';

function App() {
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
