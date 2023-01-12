import React from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu';

const Header = () => {
  return (
    <>
    <Link to='/'>BlogApp</Link>
    <Menu/>
    </>
  )
}

export default Header