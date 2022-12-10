/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Ring } from '@uiball/loaders';
import Axios from 'axios';
import Match from './Match';

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

const MatchHistory = (props) => {
  const summoner = props.summoner;
  const [loading, setLoading] = useState(true);
  const [moreLoading, setMoreLoading] = useState(false);
  const [start, setStart] = useState(0);
  const [matchIds, setMatchIds] = useState([]);
  const [matchData, setMatchData] = useState([]);
  const API_KEY = process.env.REACT_APP_API_KEY;

  const getMatchIds = async () => {
    await axios
      .get(
        `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${summoner.puuid}/ids`,
        {
          params: {
            start,
            count: 10,
            api_key: API_KEY,
          },
          timeout: 1000,
        }
      )
      .then((res) => {
        setMatchIds(res.data);
        setStart((prev) => prev + 10);
        return;
      })
      .catch((err) => {
        alert('잠시 후 다시 시도해주세요.');
        return setLoading(false);
      });
  };

  const getMatchData = (matchId) => {
    return axios.get(
      `https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}`,
      {
        params: {
          api_key: API_KEY,
        },
        timeout: 1000,
      }
    );
  };

  const moreLoadingHandler = () => {
    setMoreLoading(true);
    getMatchIds();
    return;
  };

  useEffect(() => {
    setLoading(true);
    getMatchIds();
    return () => {
      console.log('clean up');
      setStart(0);
    };
  }, [summoner]);

  useEffect(() => {
    if (matchIds.length !== 0) {
      console.log('here');
      (async function () {
        await Promise.all(
          matchIds.map((matchId) => {
            return getMatchData(matchId);
          })
        )
          .then((...res) => {
            const correctData = res[0].filter(
              (item) => item.data.info.gameCreation !== 0
            );
            const newMatchData = correctData.map((item) => item.data.info);
            console.log('get match data');
            setMatchData((prev) => [...prev, ...newMatchData]);
            setLoading(false);
            setMoreLoading(false);
            console.log('change');
            return;
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
            setMoreLoading(false);
            console.log(loading);
            return;
          });
      })();
    }
    return;
  }, [matchIds]);

  return (
    <div className='max-w-4xl w-5/6 mb-3'>
      <div className='mb-4 border-b border-myGray'>
        <p className='font-bold text-base sm:text-lg text-myIndigo pb-2'>
          전체
        </p>
      </div>
      {loading ? (
        <div className='h-52 flex justify-center items-center'>
          <Ring size={50} lineWeight={4} speed={2} color='black' />
        </div>
      ) : (
        <>
          <ul className='w-full flex flex-col items-center gap-3'>
            {matchData.length !== 0 &&
              matchData.map((match) => (
                <Match key={summoner.puuid + match.gameId} data={match} />
              ))}
          </ul>
          <div className='w-full h-10 flex justify-center mt-3'>
            {moreLoading ? (
              <div className='w-full h-full flex justify-center items-center'>
                <Ring size={20} lineWeight={4} speed={2} color='black' />
              </div>
            ) : (
              <button
                onClick={moreLoadingHandler}
                className='w-[46rem] h-full font-semibold text-sm bg-myGray bg-opacity-30 rounded-md'>
                더 보기
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MatchHistory;
