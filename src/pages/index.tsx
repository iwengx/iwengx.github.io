import * as React from 'react';
import type { HeadFC } from 'gatsby';
import { graphql } from 'gatsby';
import { QueryProps } from '../interface/pages';

import Layout from '../layout';

const IndexPage = ({ data }: { data: QueryProps }) => {
   console.log(data);

   return (
      <Layout>
         {data.allMarkdownRemark.edges.map((item) => (
            <div>
               <h2>{item.node.frontmatter.title}</h2>
               <p>{item.node.excerpt}</p>
            </div>
         ))}
      </Layout>
   );
};

export default IndexPage;

export const query = graphql`
   {
      allMarkdownRemark {
         edges {
            node {
               frontmatter {
                  title
                  date
                  tag
               }
               excerpt(pruneLength: 100)
               timeToRead
            }
         }
         totalCount
      }
   }
`;

export const Head: HeadFC = () => <title>Blog - WengX</title>;
