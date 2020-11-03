export const isAuthenticated = () => {
  let isAuthenticated = JSON.parse(localStorage.getItem('authenticated'));
  return isAuthenticated;
};