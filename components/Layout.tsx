import React from 'react';

const Layout = ({ children }:any) => {
  return (
    <>
      {/* <Sidebar />
      <SearchBar /> */}
      <div className="content">{children}</div>
    </>
  );
};

export default Layout;