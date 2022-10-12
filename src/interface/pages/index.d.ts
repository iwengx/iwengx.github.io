export interface QueryProps {
   allMarkdownRemark: {
      edges: {
         node: {
            frontmatter: {
               title: string;
            };
         };
      }[];
      totalCount: number;
   };
}
