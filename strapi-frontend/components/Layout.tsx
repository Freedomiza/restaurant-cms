import * as React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Container, Nav, NavItem } from 'reactstrap';
// import Cookie from 'js-cookie';

import defaultPage from '../hocs/defaultPage';
import { unsetToken } from '../lib/auth';

type Props = {
  title?: string,
  loggedUser: any,
  isAuthenticated: boolean,
};

type NextProps = {
  Component: React.ReactNode | any,
  req: any,
  ctx?: any,
};

class Layout extends React.Component<Props> {

  static async getInitialProps({ Component, req, ctx }: NextProps) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    console.log(pageProps);
    return { ...pageProps };
  }

  render () {
    const {
      isAuthenticated,
      children,
      loggedUser,
      title = 'This is the default title',
    } = this.props;

    return (
      <div>
        <Head>
          <title>{title}</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
            crossOrigin="anonymous"
          />
          <script src="https://js.stripe.com/v3" />
        </Head>
        <header>
          <Nav className="navbar navbar-dark bg-dark">
            <NavItem>
              <Link href="/">
                <a className="navbar-brand">Home</a>
              </Link>
            </NavItem>

            {isAuthenticated ? (
              <>
                <NavItem className="ml-auto">
                  <span style={{ color: 'white', marginRight: 30 }}>
                    {loggedUser && loggedUser.username}
                  </span>
                </NavItem>
                <NavItem>
                  <Link href="/">
                    <a className="logout" onClick={unsetToken}>
                      Logout
                    </a>
                  </Link>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem className="ml-auto">
                  <Link href="/signin">
                    <a className="nav-link">Sign In</a>
                  </Link>
                </NavItem>

                <NavItem>
                  <Link href="/signup">
                    <a className="nav-link"> Sign Up</a>
                  </Link>
                </NavItem>
              </>
            )}
          </Nav>
        </header>
        <Container>{children}</Container>
      </div>
    );
  }
}
export default defaultPage(Layout);
