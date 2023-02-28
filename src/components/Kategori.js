/* eslint-disable react/require-default-props */
/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setFilterThreadCategory } from '../states/filterThreadCategory/action';

function Kategori({ category, isClick }) {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(setFilterThreadCategory(isClick ? '' : category));
  };

  return (
    <button className={isClick ? 'categories-active' : 'categories'} onClick={onClick}>
      #
      {category}
    </button>
  );
}

Kategori.propTypes = {
  category: PropTypes.string.isRequired,
  isClick: PropTypes.bool,
};

Kategori.defaultProps = {
  isClick: false,
};

export default Kategori;
