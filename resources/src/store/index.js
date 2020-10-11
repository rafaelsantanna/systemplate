import React, { useState, useEffect } from 'react';

export const StoreContext = React.createContext({});

export default function Store(props) {
  const [store, setStore] = useState({});

  useEffect(() => {
    let logged = JSON.parse(localStorage.getItem('logged'));

    setStore({...store, logged});
  }, []);

  return (
      <StoreContext.Provider value={[store, setStore]}>
        {props.children}
      </StoreContext.Provider>
  );
}
