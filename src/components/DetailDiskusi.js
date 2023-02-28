/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
/* eslint-disable react/default-props-match-prop-types */
/* eslint-disable react/jsx-indent */
/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import moment from 'moment';
import localization from 'moment/locale/id';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Komentar from './Komentar';
import BtnVote from './BtnVote';
import KomentarCreate from './KomentarCreate';

function DetailDiskusi({ threadDetail, isUpVote, isDownVote }) {
  const { authUser = null } = useSelector((states) => states);
  const {
    id, category, title, body, createdAt, upVotesBy, downVotesBy, comments,
  } = threadDetail;

  moment.updateLocale('id', localization);
  const date = moment(createdAt).locale('id');

  return (
    <div className="detail_diskusi">
      <div className="diskusi__categories">
        <p>
          #
          {category}
        </p>
      </div>
      <h2>{title}</h2>
      <div className="diskusi__item__owner">
          <p>
            Dibuat oleh
            {' '}
            <b>{ threadDetail.owner.name }</b>
          </p>
          <img
            src={threadDetail.owner.avatar}
            alt={threadDetail.owner.name}
          />
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(body) }}
        className="diskusi__body"
      />
      <div className="diskusi__other">
      { isUpVote ? (
        <BtnVote
          action="thread"
          actionId={id}
          votesBy={upVotesBy}
          voteType={1}
        />
      ) : ''}

      { isDownVote ? (
        <BtnVote
          action="thread"
          actionId={id}
          votesBy={downVotesBy}
          voteType={-1}
        />
      ) : ''}
        <div className="diskusi__item">
          <p>{date.fromNow()}</p>
        </div>
      </div>
      {authUser ? (
        <KomentarCreate threadDetail={threadDetail} />
      ) : (
        <div className="diskusi__komentar__login">
          <h4>Silahkan Login terlebih dahulu untuk memberi komentar</h4>
          <Link to="/login">Masuk</Link>
        </div>
      )}
      <Komentar comments={comments} threadDetail={threadDetail} />
    </div>
  );
}

DetailDiskusi.propTypes = {
  threadDetail: PropTypes.object.isRequired,
};

DetailDiskusi.defaultProps = {
  isUpVote: true,
  isDownVote: true,
};

export default DetailDiskusi;
