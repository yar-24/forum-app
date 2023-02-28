/* eslint-disable linebreak-style */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncLeaderBoards } from '../states/leaderBoards/action';

function Leaderboard() {
  const { leaderBoards = [] } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncLeaderBoards());
  }, [dispatch]);

  return (
    <div className="klasement">
      <h2>Klasement Pengguna Aktif</h2>
      <div className="klasement__table">
        <p>Pengguna</p>
        <p>Skor</p>
      </div>
      {leaderBoards.map((owner, index) => (
        <div className="klasement__pengguna" style={{ backgroundColor: index === 0 ? 'gold' : 'transparent' }} key={owner.user.id}>
          <div className="klasement__pengguna_avatar">
            <p>
              {index + 1}
              .
              {' '}
            </p>
            <img src={owner.user.avatar} alt={owner.user.name} />
            <p>{owner.user.name}</p>
          </div>
          <p className="klasement__skor">{owner.score}</p>
        </div>
      ))}
    </div>
  );
}

export default Leaderboard;
