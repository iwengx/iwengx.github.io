export interface MenuProps {
   node: {
      frontmatter: {
         title: string;
         type: string;
      };
      fields: {
         slug: string;
      };
   };
}

export interface QueryProps {
   allMarkdownRemark: {
      edges: MenuProps[];
   };
}
