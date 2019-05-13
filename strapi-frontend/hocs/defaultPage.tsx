import * as React from 'react';
import Router from 'next/router';
import { getUserFromServerCookie, getUserFromLocalCookie } from '../lib/auth';

type Props<T> = {
};

const defaultPageHOC = (Page: any) =>
  class DefaultPage extends React.Component<Props<any>> {
    static async getInitialProps ({ req }: any) {
      // TODO: check either browser or server session
      const loggedUser = process.browser ? getUserFromLocalCookie()
      : getUserFromServerCookie(req);
      // debugger;
      const pageProps = Page.getInitialProps && Page.getInitialProps(req);
      console.log('is authenticated');
      // console.log(loggedUser);
      let path = req ? req.pathname : '';
      path = '';
      return {
        ...pageProps,
        loggedUser: loggedUser ? loggedUser.user: undefined,
        currentUrl: path,
        isAuthenticated: !!loggedUser,
      };
    }

    logout = (eve: any) => {
      if (eve.key === 'logout') {
        Router.push(`/?logout=${eve.newValue}`);
      }
    }
    componentDidMount() {
      window.addEventListener('storage', this.logout, false);
    }

    componentWillUnmount() {
      window.removeEventListener('storage', this.logout, false);
    }
    render() {
      return <Page {...this.props} />;
    }
  };

export default defaultPageHOC;
