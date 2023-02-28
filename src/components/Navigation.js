import React from 'react';
import { Link } from 'react-router-dom';
import { VscCommentDiscussion } from 'react-icons/vsc';
import { AiOutlineLogin } from 'react-icons/ai';
import { IoIosStats } from 'react-icons/io';
import { FiLogIn } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { asyncUnsetAuthUser } from '../states/authUser/action';

function Navigation() {
  const { authUser = null } = useSelector((states) => states);
  const dispatch = useDispatch();

  const onLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to logout from this website?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#CD5888',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Logout!',
          'Your account has been logged out.',
          'success',
        );
        dispatch(asyncUnsetAuthUser());
      }
    });
  };

  return (
    <div className="navigasi">
      <div className="navigasi__wrap">
        <Link to="/" className="navigasi__links">
          <VscCommentDiscussion size={25} />
          <p>Threads</p>
        </Link>
        <Link to="/leaderboards" className="navigasi__links">
          <IoIosStats size={25} />
          <p>Leaderboards</p>
        </Link>
        {authUser ? (
          <button className="navigasi__links" onClick={() => onLogout()}>
            <FiLogIn size={25} />
            <p>Logout</p>
          </button>
        ) : (
          <Link to="/login" className="navigasi__links">
            <AiOutlineLogin size={25} />
            <p>Login</p>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navigation;
