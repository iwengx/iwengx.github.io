import * as React from 'react';
import type { HeadFC } from 'gatsby';

import Layout from '../layout';

const AboutPage = () => {
   return (
      <Layout>
         <h1>about page</h1>
      </Layout>
   );
};

export default AboutPage;

export const Head: HeadFC = () => <title>About - WengX</title>;
