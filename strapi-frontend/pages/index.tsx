import * as React from 'react';
// import Link from 'next/link';
import {
  Alert,
  Button,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  Row,
} from 'reactstrap';

import RestaurantList from '../components/RestaurantList';
import defaultPage from '../hocs/defaultPage';

type Props = {

};

type State = {
  query: string,
};

class IndexPage extends React.Component<Props, State> {
  state: State = {
    query: '',
  };
  onChange = (e) => {
    // set the state = to the input typed in the search Input Component
    // this.state.query gets passed into RestaurantList to filter the results
    this.setState({ query: e.target.value.toLowerCase() });
  }

  render () {
    return (
      <div className="container-fluid">
        <Row>
          <Col>
            <div className="search">
              <InputGroup>
                <InputGroupAddon addonType="append"> Search </InputGroupAddon>
                <Input onChange={this.onChange.bind(this)} />
              </InputGroup>
            </div>
            <RestaurantList search={this.state.query} />
          </Col>
        </Row>
        <style>
          {`
            .search {
              margin: 20px;
              width: 500px;
            }
          `}
        </style>
      </div>
    );
  }
}

export default defaultPage(IndexPage);
