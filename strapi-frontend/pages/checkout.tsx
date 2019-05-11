import React, { useState, useContext, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import { compose } from 'recompose';

import Router from 'next/router';
import { StripeProvider, Elements } from "react-stripe-elements";

import defaultPage from '../hocs/defaultPage';
import Cart from '../components/Cart';
import InjectedCheckoutForm from '../components/Checkout/CheckoutForm';
import { AppContext } from '../context/AppProvider';

type Props = {
  isAuthenticated: boolean;
};

const apiUrl = process.env.API_URL || 'http://localhost:1337';
const stripeKey = process.env.STRIPE_KEY;

const CheckoutPage: React.FunctionComponent<Props> =  (props: Props) => {
  const [cartItems, setCartItems] = useState({});
  // const [stripe, setStripe] = useState(window.Stripe(process.env.STRIPE_KEY));
  const { isAuthenticated } = props;

  const { items, total } = useContext(AppContext);

  useEffect(() => {
    return () => {
      if (items.length === 0 || !isAuthenticated) {
        Router.push('/');
      }

    };
  },        []);

  if (items.length <= 0) {
    return <h1>Loading</h1>;
  }
  return (
    <Row>
      <Col
        style={{ paddingRight: 0 }}
        sm={{ size: 3, order: 1, offset: 2 }}
      >
        <h1 style={{ margin: 20 }}>Checkout</h1>
        <Cart isAuthenticated={isAuthenticated} />
      </Col>
      <Col style={{ paddingLeft: 5 }} sm={{ size: 6, order: 2 }}>
        <StripeProvider apiKey={stripeKey}>
          <Elements>
            <InjectedCheckoutForm
              total={total}
              items={items}
            />
          </Elements>
        </StripeProvider>
      </Col>
    </Row>
  );
};

export default compose(
  defaultPage,
)(CheckoutPage);
