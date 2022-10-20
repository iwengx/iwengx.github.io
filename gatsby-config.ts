import type { GatsbyConfig } from 'gatsby';
import _config from './_config';

const { title, siteUrl } = _config;

const config: GatsbyConfig = {
   siteMetadata: {
      title,
      siteUrl,
   },
   // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
   // If you use VSCode you can also use the GraphQL plugin
   // Learn more at: https://gatsby.dev/graphql-typegen
   graphqlTypegen: true,
   plugins: [
      'gatsby-plugin-sass',
      {
         resolve: 'gatsby-transformer-remark',
         options: {
            plugins: [],
         },
      },
      {
         resolve: 'gatsby-source-filesystem',
         options: {
            name: '../src/content',
            path: `${__dirname}/content/`,
         },
      },
      {
         resolve: `gatsby-transformer-remark`,
         options: {
            plugins: [
               {
                  resolve: `gatsby-remark-prismjs`,
                  options: {
                     classPrefix: 'language-',
                     inlineCodeMarker: null,
                     aliases: {},
                     showLineNumbers: false,
                     noInlineHighlight: false,
                     languageExtensions: [
                        {
                           language: 'superscript',
                           extend: 'javascript',
                           definition: {
                              superscript_types: /(SuperType)/,
                           },
                           insertBefore: {
                              function: {
                                 superscript_keywords: /(superif|superelse)/,
                              },
                           },
                        },
                     ],
                     prompt: {
                        user: 'root',
                        host: 'localhost',
                        global: false,
                     },
                     escapeEntities: {},
                  },
               },
            ],
         },
      },
   ],
};

export default config;
