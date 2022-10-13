import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { QueryProps } from '../../interface/pages';

import './index.scss';

const Menu = () => {
   const menuList: QueryProps = useStaticQuery(graphql`
      {
         allMarkdownRemark {
            edges {
               node {
                  frontmatter {
                     title
                  }
               }
            }
            totalCount
         }
      }
   `);

   console.log(menuList);

   return (
      <div className="menu-container">
         <ul>
            {menuList.allMarkdownRemark.edges.map((item, index) => {
               return (
                  <li key={index} className="post-title">
                     {item.node.frontmatter.title}
                  </li>
               );
            })}
         </ul>
      </div>
   );
};

export default Menu;
