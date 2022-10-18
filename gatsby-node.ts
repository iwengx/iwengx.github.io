import { createFilePath } from 'gatsby-source-filesystem';
import path from 'path';

exports.onCreateNode = ({ node, getNode, actions }: any) => {
   const { createNodeField } = actions;
   if (node.internal.type === `MarkdownRemark`) {
      const slug = createFilePath({ node, getNode, basePath: `pages` });
      createNodeField({
         node,
         name: `slug`,
         value: slug,
      });
   }
};

exports.createPages = async ({ graphql, actions }: any) => {
   const { createPage } = actions;

   const result = await graphql(`
      query {
         allMarkdownRemark {
            edges {
               node {
                  fields {
                     slug
                  }
               }
            }
         }
      }
   `);
   result.data.allMarkdownRemark.edges.forEach(({ node }: any) => {
      createPage({
         path: node.fields.slug,
         component: path.resolve(`./src/pages/index.tsx`),
         context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            slug: node.fields.slug,
         },
      });
   });
};
