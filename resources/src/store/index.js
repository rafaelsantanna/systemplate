import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth';

export const StoreContext = React.createContext({});

export default function Store(props) {
  const [store, setStore] = useState({});

  useEffect(() => {
    isAuthenticated() ? setStore({...store, authenticated: true}) : setStore({...store, authenticated: false})
  }, []);

  return (
      <StoreContext.Provider value={[store, setStore]}>
        {props.children}
      </StoreContext.Provider>
  );
}
