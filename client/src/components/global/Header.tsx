import React from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu';

const Header = () => {
  return (
    <div className='header'>
    <Link to='/'>BlogApp</Link>
    <Menu/>
    </div>
  )
}

export default Header