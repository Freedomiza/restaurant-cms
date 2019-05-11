import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import Router from 'next/router';
import Strapi from 'strapi-sdk-javascript';

const apiUrl = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiUrl);
type Authentication = { user: any, jwt: string };

export const setToken = (token: Authentication) => {
  if (!process.browser) {
    return;
  }
  Cookies.set('username', token.user);
  Cookies.set('jwt', token.jwt);

  if (Cookies.get('username')) {
    Router.push('/');
  }
};

export const unsetToken = () => {
  if (!process.browser) {
    return;
  }
  Cookies.remove('jwt');
  Cookies.remove('username');
  Cookies.remove('cart');

  // to support logging out from all windows
  window.localStorage.setItem('logout', `${Date.now()}`);
  Router.push('/');
};

export const strapiRegister = async (usn: string, email: string, pwd: string):
  Promise<Authentication> => {
  if (!process.browser) { return undefined; }
  const res = await strapi.register(usn, email, pwd);
  setToken(res);
  return res;
};

export const getUserFromServerCookie = (req: any) => {
  // console.log(req);
  if (!req.headers.cookie || '') {
    return undefined;
  }

  let username = req.headers.cookie
  .split(';')
  .find(user => user.trim().startsWith('username='));
  if (username) {
    username = username.split('=')[1];
  }

  const jwtCookie = req.headers.cookie
    .split(';')
    .find(c => c.trim().startsWith('jwt='));
  if (!jwtCookie) {
    return undefined;
  }

  const jwt = jwtCookie.split('=')[1];
  const res = jwtDecode(jwt);
  // console.log(username);
  return {
    token: res,
    user: username ? JSON.parse(decodeURIComponent(username)) : undefined,
  };

};

export const getUserFromLocalCookie = () => {
  const user = Cookies.get('username');
  console.log(user);
  return user ?  { user: JSON.parse(user) } : undefined;
};

// these will be used if you expand to a provider such as Auth0
const getQueryParams = (): any => {
  const params = {};
  window.location.href.replace(
    /([^(?|#)=&]+)(=([^&]*))?/g,
    ($0, $1, $2, $3) : any => {
      params[$1] = $3;
    },
  );
  return params;
};
export const extractInfoFromHash = () => {
  if (!process.browser) {
    return undefined;
  }
  const { id_token, state } = getQueryParams();
  return { token: id_token, secret: state };
};

// use strapi to get a JWT and token object, save
// to approriate cookei for future requests
export const strapiLogin = (email, password) => {
  if (!process.browser) {
    return;
  }
  // Get a token
  strapi.login(email, password).then((res: any) => {
    setToken(res);
  });
  return Promise.resolve();
};
