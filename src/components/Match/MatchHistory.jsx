/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Match from './Match';

const MatchHistory = () => {
  const { state: summoner } = useLocation();
  const [matchIds, setMatchIds] = useState(null);
  const [matchData, setMatchData] = useState(null);
  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const getMatchId = async () => {
      await axios
        .get(
          `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${summoner.puuid}/ids`,
          {
            params: {
              start: 0,
              count: 10,
              api_key: API_KEY,
            },
          }
        )
        .then((res) => {
          setMatchIds(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    getMatchId();
  }, [summoner]);

  useEffect(() => {
    if (matchIds !== null) {
      const getMatchData = (matchId) => {
        return axios.get(
          `https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}`,
          {
            params: {
              api_key: API_KEY,
            },
          }
        );
      };

      (async function () {
        await axios
          .all(
            matchIds.map((matchId) => {
              return getMatchData(matchId);
            })
          )
          .then(
            axios.spread((...res) => {
              const correctData = res.filter(
                (item) => item.data.info.gameCreation !== 0
              );
              setMatchData(correctData.map((item) => item.data.info));
            })
          );
      })();
    }
    return;
  }, [matchIds]);

  return (
    <div className='w-full'>
      <div className='mb-4 border-b border-myGray'>
        <p className='font-bold text-lg text-myIndigo py-2'>전체</p>
      </div>
      <ul className='w-full flex flex-col items-center gap-3'>
        {matchData &&
          matchData.map((match) => <Match key={match.gameId} data={match} />)}
      </ul>
    </div>
  );
};

export default MatchHistory;
