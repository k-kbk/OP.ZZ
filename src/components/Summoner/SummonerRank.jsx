/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Axios from 'axios';
import Tier from './Tier';

const axios = Axios.create();
axios.interceptors.response.use(undefined, (error) => {
  const config = error.config;
  config.retryCount = isNaN(config.retryCount) ? 0 : config.retryCount;
  config.retryCount += 1;
  if (config.retryCount > 2) {
    return Promise.reject(error);
  }
  return axios.request(config);
});

const SummonerRank = memo((props) => {
  const { state: summoner } = useLocation();
  const [loading, setLoading] = useState(true);
  const [rankedSolo, setRankedSolo] = useState(null);
  const [rankedFlex, setRankedFlex] = useState(null);
  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    if (summoner) {
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
            setLoading(false);
          });
      };
      getLeagueData();
    }
  }, [summoner]);

  return (
    <>
      {loading ? (
        <div className='h-56 sm:h-36 flex justify-center items-center bg-gray-100'></div>
      ) : (
        <div className='flex flex-col sm:flex-row justify-center items-center pt-3 pb-3 sm:pb-5'>
          {rankedSolo && <Tier data={rankedSolo} />}
          {rankedFlex && <Tier data={rankedFlex} />}
        </div>
      )}
    </>
  );
});

export default SummonerRank;
