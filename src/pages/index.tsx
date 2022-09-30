import * as React from 'react';
import type { HeadFC } from 'gatsby';
import { graphql } from 'gatsby';
import { QueryProps } from '../interface/pages';

import Layout from '../layout';

import './styles/index.scss';

const IndexPage = ({ data }: { data: QueryProps }) => {
   console.log(data);

   return (
      <Layout>
         <article className="index-wrap">
            {data.allMarkdownRemark.edges.map((item, index) => (
               <div key={index} className="post">
                  <h2 className="title text-primary">
                     {item.node.frontmatter.title}
                  </h2>
                  <p className="excerpt">{item.node.excerpt}</p>
               </div>
            ))}
         </article>
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
