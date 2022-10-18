import React, { ReactNode } from 'react';

const Content = ({ children }: { children?: string }) => {
   return <div dangerouslySetInnerHTML={{ __html: children || '' }}></div>;
};

export default Content;
