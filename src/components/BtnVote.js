/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import {
  AiOutlineLike, AiFillLike,
  AiOutlineDislike, AiFillDislike,
} from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { asyncVoteThread } from '../states/threads/action';
import { asyncVoteComment } from '../states/threadDetail/action';

function BtnVote({
  action, actionId, commentId, votesBy, voteType,
}) {
  const {
    authUser = null,
  } = useSelector((states) => states);

  const dispatch = useDispatch();

  const onVote = () => {
    if (!authUser) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Silahkan Login Dahulu!',
      });
      return false;
    }
    // disini action akan menentukan aksi btn vote akan ke thread / comment
    switch (action) {
      case 'thread':
        dispatch(asyncVoteThread(
          actionId,
          authUser.id,
          votesBy.includes(authUser.id) ? 0 : voteType,
          votesBy.includes(authUser.id) ? voteType : 0,
        ));
        break;

      case 'comment':
        dispatch(asyncVoteComment(
          actionId,
          commentId,
          votesBy.includes(authUser.id) ? 0 : voteType,
        ));
        break;

      default:
        break;
    }
    return true;
  };

  return (
    <button
      className="btn__item"
      onClick={onVote}
    >
      {
        voteType === -1 ? (
          <>
            {/* Button dislike */}
            {authUser && votesBy.includes(authUser.id) ? (
              <AiFillDislike />
            ) : (
              <AiOutlineDislike />
            )}

          </>
        ) : (
          <>
            {/* Button like */}
            {authUser && votesBy.includes(authUser.id) ? (
              <AiFillLike />
            ) : (
              <AiOutlineLike />
            )}
          </>
        )
      }

      <span>
        { votesBy.length}
      </span>
    </button>
  );
}

BtnVote.propTypes = {
  action: PropTypes.string.isRequired, //  thread | comment
  actionId: PropTypes.string.isRequired, // thread id | comment id
  commentId: PropTypes.string,
  voteType: PropTypes.number.isRequired, // 1 | -1
  votesBy: PropTypes.oneOfType([PropTypes.array]),
};

BtnVote.defaultProps = {
  votesBy: [],
  commentId: '',
};

export default BtnVote;
