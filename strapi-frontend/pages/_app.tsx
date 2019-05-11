/* _app.js */
import * as React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from 'react-apollo';
import { StripeProvider } from 'react-stripe-elements';
import withApolloClient from '../hocs/withApolloClient';
import Layout from '../components/Layout';
import { AppProvider } from '../context/AppProvider';

type Props = {
  Component: React.ReactNode | any;
  router: any;
  ctx: any;
  apolloClient: any,
  isAuthenticated: boolean,
};
class MyApp extends App<Props> {
  static async getInitialProps({ Component, router, ctx }: Props) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  render() {
    const { Component, pageProps, apolloClient, isAuthenticated, ctx  } = this.props;
    return (
      <React.Fragment>
        <Head>
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
            crossOrigin="anonymous"
          />
        </Head>

        <Container>
          <ApolloProvider client={apolloClient}>
            <AppProvider>
              <Layout isAuthenticated={isAuthenticated} {...pageProps}>
                <Component {...pageProps} />
              </Layout>
            </AppProvider>
          </ApolloProvider>
        </Container>
        <style jsx global>
          {`
            a {
              color: white !important;
            }
            a:link {
              text-decoration: none !important;
              color: white !important;
            }
            a:hover {
              color: white;
            }
          `}
        </style>
      </React.Fragment>
    );
  }
}

export default withApolloClient(MyApp);
