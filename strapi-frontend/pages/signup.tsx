import * as React from 'react';
import Router from 'next/router';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from 'reactstrap';

import Layout from '../components/Layout';
import { strapiRegister } from '../lib/auth';
import { any } from 'prop-types';

type Props = {

};

type State = {
  data: any,
  loading: boolean,
  error: string,
};

export default class SignUp extends React.Component<Props, State> {
  state: State = {
    data: {
      email: '',
      password: '',
      username: '',
    },
    loading: false,
    error: '',
  };

  onChange = (propName: string, evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt && evt.target) {
      console.log(evt);
      const { value = ' ' } = evt.target;
      this.setState((prevState: State) => ({
        ...prevState,
        data: {
          ...prevState.data,
          [propName]: value,
        },
      }));
    }
  }

  onSubmit = async () => {
    const {
      data: { email, username, password },
    } = this.state;
    try {

      this.setState({ loading: true });
      await strapiRegister(username, email, password);

    } catch (err) {
      this.setState({
        error: err,
      });
    } finally {
      this.setState({ loading : false });
    }
  }

  render() {
    const { error } = this.state;
    return (
      <Container>
        <Row>
          <Col sm="12" md={{ size: 5, offset: 3 }}>
            <div className="paper">
              <div className="header">
                <img src="https://strapi.io/assets/images/logo.png" />
              </div>
              <section className="wrapper">
                <div className="notification">{error}</div>
                <Form>
                  <FormGroup>
                    <Label>Username:</Label>
                    <Input
                      onChange={evt => this.onChange('username', evt)}
                      type="text"
                      name="username"
                      style={{ height: 50, fontSize: '1.2em' }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Email:</Label>
                    <Input
                      onChange={evt => this.onChange('email', evt)}
                      type="email"
                      name="email"
                      style={{ height: 50, fontSize: '1.2em' }}
                    />
                  </FormGroup>
                  <FormGroup style={{ marginBottom: 30 }}>
                    <Label>Password:</Label>
                    <Input
                      onChange={evt => this.onChange('password', evt)}
                      type="password"
                      name="password"
                      style={{ height: 50, fontSize: '1.2em' }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <span>
                      <a href="">
                        <small>Forgot Password?</small>
                      </a>
                    </span>
                    <Button
                      style={{ float: 'right', width: 120 }}
                      color="primary"
                      onClick={this.onSubmit.bind(this)}
                    >
                      Submit
                    </Button>
                  </FormGroup>
                </Form>
              </section>
            </div>
          </Col>
        </Row>
        <style jsx>
          {`
            .paper {
              border: 1px solid lightgray;
              box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
                0px 1px 1px 0px rgba(0, 0, 0, 0.14),
                0px 2px 1px -1px rgba(0, 0, 0, 0.12);
              height: 540px;
              border-radius: 6px;
              margin-top: 90px;
            }
            .notification {
              color: #ab003c;
            }
            .header {
              width: 100%;
              height: 120px;
              background-color: #2196f3;
              margin-bottom: 30px;
              border-radius-top: 6px;
            }
            .wrapper {
              padding: 10px 30px 20px 30px !important;
            }
            a {
              color: blue !important;
            }
            img {
              margin: 15px 30px 10px 50px;
            }
          `}
        </style>
      </Container>);
  }
}
