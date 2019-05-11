import * as React from 'react';
import defaultPageHOC from './DefaultPage';

type Props = {
  isAuthenticated: boolean,
};

const securePageHoc = (Page: any) =>
  class SecurePage extends React.Component<Props> {
    static getInitialProps(ctx) {
      return Page.getInitialProps && Page.getInitialProps(ctx);
    }

    render() {
      const { isAuthenticated } = this.props;
      return isAuthenticated ? <Page {...this.props} /> : 'Not Authorized';
    }
  };

export default Page => defaultPageHOC(securePageHoc(Page));
