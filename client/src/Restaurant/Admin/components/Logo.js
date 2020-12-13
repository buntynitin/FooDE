import React from 'react';

const Logo = (props) => {
  return (
    
    <img
      alt="Logo"
      src="/logo.svg"
      style={{width:"50px" , height:"50px"}}
      {...props}
    />
  );
};

export default Logo;
