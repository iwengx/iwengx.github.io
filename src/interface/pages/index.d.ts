export interface QueryProps {
   allMarkdownRemark: {
      edges: {
         node: {
            excerpt: string;
            timeToRead: number;
            frontmatter: {
               date: string;
               title: string;
               tag: string[];
            };
         };
      }[];
      totalCount: number;
   };
}
