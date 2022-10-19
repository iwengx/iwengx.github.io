import * as React from 'react';
import type { HeadFC } from 'gatsby';
import { graphql } from 'gatsby';

import Layout from '../layout';
import Menu from '../components/menu';
import Content from '../components/content';

import './styles/index.scss';

const IndexPage = ({ data }: any) => {
   const post = data && data.markdownRemark;

   return (
      <Layout>
         <aside className="index-menu">
            <Menu fields={post.fields}></Menu>
         </aside>
         <article className="index-article">
            {post && <Content children={post.html}></Content>}
         </article>
      </Layout>
   );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Blog - WengX</title>;

export const query = graphql`
   query ($slug: String = "/home/") {
      markdownRemark(fields: { slug: { eq: $slug } }) {
         html
         fields {
            slug
         }
      }
   }
`;
