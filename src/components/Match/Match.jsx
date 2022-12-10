/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Item from './Item';

const spell = {
  1: 'SummonerBoost',
  3: 'SummonerExhaust',
  4: 'SummonerFlash',
  6: 'SummonerHaste',
  7: 'SummonerHeal',
  11: 'SummonerSmite',
  12: 'SummonerTeleport',
  13: 'SummonerMana',
  14: 'SummonerDot',
  21: 'SummonerBarrier',
  30: 'SummonerPoroRecall',
  31: 'SummonerPoroThrow',
  32: 'SummonerSnowball',
  39: 'SummonerSnowURFSnowball_Mark',
};

const gameMode = {
  CLASSIC: 'RANK',
  URF: 'U.R.F',
  ARAM: '무작위 총력전',
};

const Match = memo((props) => {
  const { state: summoner } = useLocation();
  const [userData, setUserData] = useState(null);
  const [team1, setTeam1] = useState(null);
  const [team2, setTeam2] = useState(null);
  const navigate = useNavigate();
  const { REACT_APP_IMG_URL: IMG_URL, REACT_APP_API_KEY: API_KEY } =
    process.env;
  const match = props.data;

  const clickNameHandler = async (e) => {
    e.preventDefault();
    await axios
      .get(e.target.href, { params: { api_key: API_KEY } })
      .then((res) => {
        navigate(`/summoner/${res.data.name}`, { state: res.data });
        window.location.reload();
      })
      .catch((err) => {
        alert('소환사를 찾을 수 없습니다.');
      });
  };

  useEffect(() => {
    if (match) {
      setTeam1(match.participants.slice(0, 5));
      setTeam2(match.participants.slice(5, 10));
      setUserData(
        match.participants.find((user) => user.puuid === summoner.puuid)
      );
    }
  }, [match, summoner]);

  return (
    <>
      {userData && (
        <li
          className={`sm:max-w-[46rem] w-full h-28 flex justify-end sm:justify-center items-center mb-3 ${
            userData.win ? 'bg-blue-400' : 'bg-red-400'
          } rounded-md bg-opacity-30`}>
          <div className='w-[27%] sm:w-2/12 flex flex-col pl-2 sm:ml-3 sm:mr-0'>
            <p className='font-semibold text-xs'>{gameMode[match.gameMode]}</p>
            <p className='font-semibold text-xs mb-1'>{`${new Date(
              match.gameStartTimestamp
            ).toLocaleDateString()}`}</p>
            <p
              className={`font-semibold text-sm sm:text-base ${
                userData.win ? 'text-blue-600' : 'text-red-600'
              }`}>
              {userData.win ? '승리' : '패배'}
            </p>
            <p className='font-semibold text-xs'>{`${Math.floor(
              match.gameDuration / 60
            )}분 ${match.gameDuration % 60}초`}</p>
          </div>
          <div className='w-[43%] sm:w-[28%] flex flex-col items-start pl-2 sm:mr-3'>
            <div className='flex justify-start items-center'>
              <div className='w-8 sm:w-12 relative rounded-sm overflow-hidden'>
                <img
                  src={`${IMG_URL}/champion/${
                    userData.championName === 'FiddleSticks'
                      ? 'Fiddlesticks'
                      : userData.championName
                  }.png`}
                  alt='champion'
                />
                <p className='font-semibold text-xs text-white absolute bottom-0 right-0 z-10 sm:p-0.5 bg-black bg-opacity-60'>
                  {userData.champLevel}
                </p>
              </div>
              <div className='flex flex-col mr-3 sm:mr-5'>
                <div className='w-4 sm:w-6 rounded-sm overflow-hidden'>
                  <img
                    src={`${IMG_URL}/spell/${spell[userData.summoner1Id]}.png`}
                    alt='spell'
                  />
                </div>
                <div className='w-4 sm:w-6 rounded-sm overflow-hidden'>
                  <img
                    src={`${IMG_URL}/spell/${spell[userData.summoner2Id]}.png`}
                    alt='spell'
                  />
                </div>
              </div>
              <div className='flex flex-col items-center'>
                <div className='font-semibold text-sm sm:text-base'>
                  <span>{`${userData.kills} / `}</span>
                  <span className='text-red-600'>{`${userData.deaths}`}</span>
                  <span>{` / ${userData.assists}`}</span>
                </div>
                {
                  <p
                    className={`font-semibold text-xs ${
                      (userData.kills + userData.assists) / userData.deaths >= 5
                        ? 'text-orange-500'
                        : 'text-emerald-500'
                    } ${
                      (userData.kills + userData.assists) / userData.deaths < 3
                        ? 'text-myBlack'
                        : ''
                    }`}>
                    {userData.deaths === 0
                      ? 'Perfect'
                      : (
                          (userData.kills + userData.assists) /
                          userData.deaths
                        ).toFixed(2) + ' KDA'}
                  </p>
                }
              </div>
            </div>
            <div className='flex flex-col justify-center items-start'>
              <div className='flex mt-3'>
                <Item data={userData.item0} />
                <Item data={userData.item1} />
                <Item data={userData.item2} />
                <Item data={userData.item3} />
                <Item data={userData.item4} />
                <Item data={userData.item5} />
                <Item data={userData.item6} />
              </div>
            </div>
          </div>
          <div className='w-[21%] sm:w-[11%] flex flex-col font-semibold text-xs ml-2 mr-1'>
            {match.gameMode === 'CLASSIC' && (
              <p className='text-red-600'>{`KP ${
                isNaN(userData.challenges.killParticipation)
                  ? 0
                  : (userData.challenges.killParticipation * 100).toFixed()
              }%`}</p>
            )}
            <p>{`CS ${userData.totalMinionsKilled}`}</p>
            <p>{`제어와드 ${userData.visionWardsBoughtInGame}`}</p>
            <p>{`${userData.goldEarned.toLocaleString()} G`}</p>
          </div>
          <div className='w-4/12 hidden sm:flex justify-end mt-0.5'>
            <ul className='w-[45%] font-semibold text-xs flex flex-col sm:pl-1'>
              {team1.map((player) => {
                return (
                  <li
                    key={player.summonerName}
                    className='flex flex-row mb-0.5'>
                    <div className='w-4 rounded-sm overflow-hidden'>
                      <img
                        src={`${IMG_URL}/champion/${
                          player.championName === 'FiddleSticks'
                            ? 'Fiddlesticks'
                            : player.championName
                        }.png`}
                        alt='champ'
                      />
                    </div>
                    <a
                      onClick={clickNameHandler}
                      href={`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${player.summonerName}`}
                      className='pl-1 hover:underline'>
                      {player.summonerName.length > 5
                        ? player.summonerName.substr(0, 5) + '...'
                        : player.summonerName}
                    </a>
                  </li>
                );
              })}
            </ul>
            <ul className='w-[45%] font-semibold text-xs flex flex-col sm:pl-1'>
              {team2.map((player) => {
                return (
                  <li
                    key={player.summonerName}
                    className='flex flex-row mb-0.5'>
                    <div className='w-4 rounded-sm overflow-hidden'>
                      <img
                        src={`${IMG_URL}/champion/${
                          player.championName === 'FiddleSticks'
                            ? 'Fiddlesticks'
                            : player.championName
                        }.png`}
                        alt='champ'
                      />
                    </div>
                    <a
                      onClick={clickNameHandler}
                      href={`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${player.summonerName}`}
                      className='pl-1 hover:underline'>
                      {player.summonerName.length > 5
                        ? player.summonerName.substr(0, 5) + '...'
                        : player.summonerName}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </li>
      )}
    </>
  );
});

export default Match;
