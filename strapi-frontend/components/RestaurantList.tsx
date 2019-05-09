import * as React from 'react';
import gql from 'graphql-tag';
import Link from 'next/link';

import { graphql } from 'react-apollo';
import {
  Button,
  Card,
  CardBody,
  CardColumns,
  CardImg,
  CardSubtitle,
  CardText, CardTitle, Col, Row,
} from 'reactstrap';

import './RestaurantList.scss';

type Props =  {
  data: {
    loading: boolean,
    error: Error,
    restaurants: any[],
  },
  search?: string,
};

class RestaurantList extends React.Component<Props> {
  static getInitialProps = async ({ req }) => {
  }

  render() {
    const { data: { loading, error, restaurants }, search } = this.props;
    if (error) return 'Error loading restaurants';
  // if restaurants are returned from the GraphQL query, run the filter query
  // and set equal to variable restaurantSearch

    if (restaurants && restaurants.length) {
    // searchQuery
      const searchQuery = restaurants.filter(query =>
      query.name.toLowerCase().includes(search),
    );
      if (searchQuery.length !== 0) {
        return (
          <div className="h-100 container row">
            {searchQuery.map(res => (
              <div className="col" key={res.id}>
                <Card
                  className="h-100"
                >
                  <CardImg
                    top={true}
                    style={{ height: 250 }}
                    src={`http://localhost:1337${res.image.url}`}
                  />
                  <CardBody>
                    <CardTitle>{res.name}</CardTitle>
                    <CardText>{res.description.slice(0, 100)}</CardText>
                  </CardBody>
                  <div className="card-footer">
                    <Link
                      as={`/restaurants/${res.id}`}
                      href={`/restaurants?id=${res.id}`}
                    >
                      <a className="btn btn-primary">View</a>
                    </Link>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        );
      }
      return <h1>No Restaurants Found</h1>;
    }
    return <h1>Loading</h1>;
  }
}

const query = gql`
  {
    restaurants {
      id
      name
      description
      image {
        url
      }
    }
  }
`;

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (RestaurantList)
export default graphql<any>(query, {
  props: ({ data }) => ({
    data,
  }),
})(RestaurantList);
