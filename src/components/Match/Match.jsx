/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
  const { REACT_APP_IMG_URL: IMG_URL } = process.env;
  const match = props.data;
  console.log(match);

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
          className={`max-w-screen-md w-full h-28 flex justify-center items-center ${
            userData.win ? 'bg-blue-400' : 'bg-red-400'
          } rounded-md bg-opacity-30`}>
          <div className='w-2/12  flex flex-col ml-5'>
            <p className='font-semibold text-xs'>{gameMode[match.gameMode]}</p>
            <p className='font-semibold text-xs mb-1'>{`${new Date(
              match.gameStartTimestamp
            ).toLocaleDateString()}`}</p>
            <p
              className={`font-semibold ${
                userData.win ? 'text-blue-600' : 'text-red-600'
              }`}>
              {userData.win ? '승리' : '패배'}
            </p>
            <p className='font-semibold text-xs'>{`${Math.floor(
              match.gameDuration / 60
            )}분 ${match.gameDuration % 60}초`}</p>
          </div>
          <div className='w-3/12 flex flex-col mr-6'>
            <div className='flex justify-start items-center'>
              <div className='w-12 relative rounded-sm overflow-hidden'>
                <img
                  src={`${IMG_URL}/champion/${
                    userData.championName === 'FiddleSticks'
                      ? 'Fiddlesticks'
                      : userData.championName
                  }.png`}
                  alt='champion'
                />
                <p className='font-semibold text-xs text-white absolute bottom-0 right-0 z-10 p-0.5 bg-black bg-opacity-60'>
                  {userData.champLevel}
                </p>
              </div>
              <div className='flex flex-col mr-5'>
                <div className='w-6 rounded-sm overflow-hidden'>
                  <img
                    src={`${IMG_URL}/spell/${spell[userData.summoner1Id]}.png`}
                    alt='spell'
                  />
                </div>
                <div className='w-6 rounded-sm overflow-hidden'>
                  <img
                    src={`${IMG_URL}/spell/${spell[userData.summoner2Id]}.png`}
                    alt='spell'
                  />
                </div>
              </div>
              <div className='flex flex-col items-center'>
                <div className='font-semibold text-base'>
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
                    }`}>{`${
                    (userData.kills + userData.assists) / userData.deaths ===
                    Infinity
                      ? 'Perfect'
                      : (
                          (userData.kills + userData.assists) /
                          userData.deaths
                        ).toFixed(2)
                  } KDA`}</p>
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
          <div className='w-1/12 flex flex-col font-semibold text-xs mr-3'>
            {match.gameMode === 'CLASSIC' && (
              <p className='text-red-600'>{`킬관여율 ${(
                userData.challenges.killParticipation * 100
              ).toFixed()}%`}</p>
            )}
            <p>{`CS ${userData.totalMinionsKilled}`}</p>
            <p>{`제어와드 ${userData.visionWardsBoughtInGame}`}</p>
            <p>{`골드 ${userData.goldEarned.toLocaleString()}`}</p>
          </div>
          <div className='w-4/12 flex justify-end gap-1'>
            <ul className='w-5/12 font-semibold text-xs flex flex-col gap-0.5 '>
              {team1.map((player) => {
                return (
                  <li className='flex flex-row'>
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
                    <p className='pl-1'>
                      {player.summonerName.length > 6
                        ? player.summonerName.substr(0, 6) + '..'
                        : player.summonerName}
                    </p>
                  </li>
                );
              })}
            </ul>
            <ul className='w-5/12 font-semibold text-xs flex flex-col gap-0.5 '>
              {team2.map((player) => {
                return (
                  <li className='flex flex-row'>
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
                    <p className='pl-1'>
                      {player.summonerName.length > 6
                        ? player.summonerName.substr(0, 6) + '..'
                        : player.summonerName}
                    </p>
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
