import React from 'react';
import { useLocation } from 'react-router-dom';
import Nav from '../components/Nav';
import SummonerInfo from '../components/SummonerInfo';
import MatchHistory from '../components/MatchHistory';

const SummonerPage = () => {
  const location = useLocation();
  console.log(location.state);
  return (
    <>
      <Nav />
      <SummonerInfo />
      <MatchHistory />
    </>
  );
};

export default SummonerPage;
