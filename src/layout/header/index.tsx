import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';

import './index.scss';

const Header = () => {
   const data = useStaticQuery(
      graphql`
         query {
            site {
               siteMetadata {
                  title
               }
            }
         }
      `
   );
   return (
      <div className="header-container">
         <div>
            <p>{data.site.siteMetadata.title}</p>
         </div>
         <div className="right">
            <Link to="/">home</Link>
            <Link to="/about">about</Link>
         </div>
      </div>
   );
};

export default Header;
