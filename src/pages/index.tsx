import * as React from 'react';
import type { HeadFC } from 'gatsby';

import Layout from '../layout';

const IndexPage = () => {
   return (
      <Layout>
         <h1>Index page</h1>
      </Layout>
   );
};

export default IndexPage;

export const Head: HeadFC = () => <title>index page</title>;
