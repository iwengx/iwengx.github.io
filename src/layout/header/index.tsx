import React from 'react';
import { Link } from 'gatsby';

import './index.scss';

const Header = () => {
   return (
      <div className="header-container">
         <div></div>
         <div className="right">
            <Link to="/">home</Link>
            <Link to="/about">about</Link>
         </div>
      </div>
   );
};

export default Header;
