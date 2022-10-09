import * as React from 'react';
import { ReactNode } from 'react';

import './index.scss';

import Header from './header';

interface Props {
   children: ReactNode | ReactNode[];
}

const Layout = ({ children }: Props) => {
   return (
      <div className="wengx-layout">
         <Header></Header>
         <main className="layout-main">{children}</main>
      </div>
   );
};

export default Layout;
