export interface MenuProps {
   node: {
      frontmatter: {
         title: string;
         type: string;
      };
   };
}

export interface QueryProps {
   allMarkdownRemark: {
      edges: MenuProps[];
   };
}
