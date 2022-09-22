import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
   siteMetadata: {
      title: 'Blog - WengX',
      siteUrl: `https://wengx-unx.github.io`,
   },
   // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
   // If you use VSCode you can also use the GraphQL plugin
   // Learn more at: https://gatsby.dev/graphql-typegen
   graphqlTypegen: true,
   plugins: [
      'gatsby-plugin-sass',
      'gatsby-transformer-remark',
      {
         resolve: 'gatsby-source-filesystem',
         options: {
            name: '../src/content',
            path: `${__dirname}/content/`,
         },
      },
   ],
};

export default config;
