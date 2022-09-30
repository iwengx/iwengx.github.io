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
         <main style={{ margin: '0 auto', maxWidth: 650 }}>{children}</main>
      </div>
   );
};

export default Layout;
