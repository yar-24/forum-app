/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
/* eslint-disable react/default-props-match-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { AiOutlineComment } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import moment from 'moment';
import localization from 'moment/locale/id';
import { truncate } from '../utils/utils';
import BtnVote from './BtnVote';

function Diskusi({ thread, isUpVote, isDownVote }) {
  const {
    id, category, title, body, createdAt, owner, upVotesBy, downVotesBy, totalComments,
  } = thread;

  moment.updateLocale('id', localization);

  const date = moment(createdAt).locale('id');

  return (
    <div className="diskusi">
      <div className="diskusi__categories">
        <p>
          #
          {category}
        </p>
      </div>
      <Link className="diskusi__link" to={`/threads/${thread.id}`}>
        {title}
      </Link>
      <div className="diskusi__item__owner">
        <p>
          Dibuat oleh
          {' '}
          <b>{owner.name}</b>
        </p>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(truncate(body, 250)) }}
        className="diskusi__body"
      />
      <div className="diskusi__other">
        {isUpVote ? (
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
        <Link className="diskusi__commment" to={`/threads/${id}`}>
          <div className="diskusi__item">
            <AiOutlineComment />
            <span>{totalComments}</span>
          </div>
        </Link>
        <div className="diskusi__item">
          <p>{date.fromNow()}</p>
        </div>
      </div>
    </div>
  );
}

Diskusi.propTypes = {
  thread: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

Diskusi.defaultProps = {
  isUpVote: true,
  isDownVote: true,
};

export default Diskusi;
