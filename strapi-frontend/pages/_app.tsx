/* _app.js */
import * as React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import withData from '../lib/apollo';

type Props = {
  Component: React.ReactNode | any;
  router: any;
  ctx: any;
};
class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }: Props) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
            crossOrigin="anonymous"
          />
        </Head>

        <Container>
          <Component {...pageProps} />
        </Container>
      </>
    );
  }
}

export default withData(MyApp);
