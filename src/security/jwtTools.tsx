
export const setToken = (token: string) =>{ 
      const BEARER=process.env.REACT_APP_BEARER||"Bearerer ";
      localStorage.setItem('token', token.replace(BEARER, ''));
    }
  
export const decodeToken = () => {
      let tokenStr = localStorage.getItem('token');
      if (!tokenStr)
        return '';
      tokenStr = tokenStr.split('.')[1];
      const token = JSON.parse(atob(tokenStr));
      return token;
    }
  
export const isExpired = () => {
      const token = decodeToken();
      return (new Date()).getTime()/1000 < token.exp;
    }
  
export const getRoles = () => {
      const token = decodeToken();
      return token.roles;
    }

export const logOut = () => {
  localStorage.clear();
}

export const getUsername = () => {
  const token = decodeToken();
  return token.sub instanceof Function ? "" : token.sub;
}
