import * as React from 'react';
import { graphql } from 'gatsby';
import { QueryProps } from '../../interface/pages';

import './index.scss';

const Menu = ({ data }: { data: QueryProps }) => {
   console.log(data);

   return <div></div>;
};

export const query = graphql`
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
`;

export default Menu;
