import * as React from 'react';
import type { HeadFC } from 'gatsby';

import Layout from '../layout';
import Menu from '../components/menu';

import './styles/index.scss';

const IndexPage = () => {
   return (
      <Layout>
         <aside className="index-menu">
            <Menu></Menu>
         </aside>
         <article className="index-article"></article>
      </Layout>
   );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Blog - WengX</title>;
