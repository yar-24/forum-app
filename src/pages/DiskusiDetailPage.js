/* eslint-disable linebreak-style */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DetailDiskusi from '../components/DetailDiskusi';
import { asyncSetThreadDetail } from '../states/threadDetail/action';

function DiskusiDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { threadDetail = null } = useSelector((states) => states);

  useEffect(() => {
    dispatch(asyncSetThreadDetail(id));
  }, [dispatch, id]);

  if (!threadDetail) {
    return null;
  }

  return (
    <div style={{ marginTop: '10px' }}>
      <DetailDiskusi threadDetail={threadDetail} />
    </div>
  );
}

export default DiskusiDetailPage;
