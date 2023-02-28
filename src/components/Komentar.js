/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-indent */
/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import localization from 'moment/locale/id';
import DOMPurify from 'dompurify';
import BtnVote from './BtnVote';

function Komentar({ comments, threadDetail }) {
  moment.updateLocale('id', localization);
  return (
    <div className="komentar">
      <h4>
        Komentar (
        {comments.length}
        )
      </h4>
      {comments.length === 0 ? (
        <div className="komentar__wrap">
          {' '}
          <h5>tidak ada komentar</h5>
          {' '}
        </div>
      ) : (
        comments.map((comment) => (
          <div className="komentar__wrap" key={comment.id}>
            <div className="komentar__owner">
              <div className="komentar__owner__name">
                <img src={comment.owner.avatar} alt={comment.owner.name} />
                <h5>{comment.owner.name}</h5>
              </div>
              <p>{moment(comment.createdAt).locale('id').fromNow()}</p>
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(comment.content) }}
              className="diskusi__body"
            />
              <BtnVote
                action="comment"
                voteType={1}
                actionId={threadDetail.id}
                commentId={comment.id}
                votesBy={comment.upVotesBy}
              />

              <BtnVote
                action="comment"
                voteType={-1}
                actionId={threadDetail.id}
                commentId={comment.id}
                votesBy={comment.downVotesBy}
              />
          </div>
        ))
      )}
    </div>
  );
}

Komentar.propTypes = {
  comments: PropTypes.oneOfType([PropTypes.array]).isRequired,
  threadDetail: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Komentar;
