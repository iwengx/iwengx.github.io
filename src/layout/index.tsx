import * as React from 'react';
import { ReactNode } from 'react';

import Header from './header';

interface Props {
   children: ReactNode | ReactNode[];
}

const Layout = ({ children }: Props) => {
   return (
      <div>
         <Header></Header>
         <main
            style={{ margin: `3rem auto`, maxWidth: 650, padding: `0 1rem` }}
         >
            {children}
         </main>
      </div>
   );
};

export default Layout;
