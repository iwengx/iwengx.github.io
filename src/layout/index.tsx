import * as React from 'react';
import { ReactNode } from 'react';

import Header from './header';

interface Props {
   children: ReactNode | ReactNode[];
}

const Layout = ({ children }: Props) => {
   return (
      <div style={{ margin: `3rem auto`, maxWidth: 650, padding: `0 1rem` }}>
         <Header></Header>
         {children}
      </div>
   );
};

export default Layout;
