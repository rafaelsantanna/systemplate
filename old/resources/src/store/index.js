import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth';

export const StoreContext = React.createContext({});

export default function Store(props) {
  const [store, setStore] = useState({});

  useEffect(() => {
    if (isAuthenticated()) { 
      let authenticatedUser = JSON.parse(localStorage.getItem('authenticated_user'));
      let jwt = localStorage.getItem('jwt');
      setStore({...store, authenticated: true, authenticatedUser: authenticatedUser, jwt: jwt});
    }
  }, []);

  return (
      <StoreContext.Provider value={[store, setStore]}>
        {props.children}
      </StoreContext.Provider>
  );
}
