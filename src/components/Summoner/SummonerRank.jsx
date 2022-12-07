/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Tier from './Tier';

const SummonerRank = memo((props) => {
  const { state: summoner } = useLocation();
  const [rankedSolo, setRankedSolo] = useState(null);
  const [rankedFlex, setRankedFlex] = useState(null);
  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const getLeagueData = async () => {
      await axios
        .get(
          `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${summoner.id}`,
          {
            params: {
              api_key: API_KEY,
            },
          }
        )
        .then((res) => {
          setRankedSolo(res.data[0]);
          setRankedFlex(res.data[1]);
        });
    };
    getLeagueData();
  }, [summoner]);

  return (
    <div className='flex flex-col sm:flex-row justify-center items-center pt-5 pb-2'>
      {rankedSolo && <Tier data={rankedSolo} />}
      {rankedFlex && <Tier data={rankedFlex} />}
    </div>
  );
});

export default SummonerRank;
