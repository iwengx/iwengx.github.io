export interface QueryProps {
   allMarkdownRemark: {
      edges: {
         node: {
            frontmatter: {
               title: string;
               tag: string[];
            };
         };
      }[];
   };
}
