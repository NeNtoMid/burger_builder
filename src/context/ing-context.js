import React from 'react';

const ingContext = React.createContext({
  increase: () => {},
  decrease: () => {},
});

export default ingContext;
