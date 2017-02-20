import React from 'react';
import './header-style';

import Button from '../Button/Button';

const logStuff = () => {
  console.log("clicked!");
}

const Header = () => {
  return (
    <div className="Header">
      <h1>Header thang</h1>
      <Button handleClick={() => logStuff()} />
    </div>
  );
}

export default Header;
