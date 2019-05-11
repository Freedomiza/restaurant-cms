
import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { withRouter } from 'next/router';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import {
  Button,
  Card,
  CardBody,
  CardColumns,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Row,
} from 'reactstrap';
import { IRestaurant } from '../interfaces/Restaurant';
import defaultPage from '../hocs/defaultPage';
import Cart from '../components/Cart';
import { IDish } from '../interfaces/Dish';
import { AppContext } from '../context/AppProvider';

type Props = {
  data: {
    loading: boolean,
    error: string,
    restaurant: IRestaurant,
  },
  router: any,
  context: any,
  isAuthenticated: boolean,
};

const Restaurants: React.FunctionComponent<Props> = (props) => {
  const {
      data: { loading, error, restaurant },
      router,
      context,
      isAuthenticated,
    } = props;

  const { addItem } = useContext(AppContext);
  if (error) return <h2>Error Loading Dishes</h2>;
  if (restaurant) {
    return (
        <React.Fragment>
          <h1>{restaurant.name}</h1>
          <Row>
            <Col xs="9" style={{ padding: 0 }}>
              <div className="h-100 w-100">
                {restaurant.dishes.map((dish: IDish) => (
                  <Card
                    key={dish.id}
                    className="w-50"
                  >
                    <CardImg
                      top={true}
                      style={{ height: 250 }}
                      src={`http://localhost:1337${dish.image.url}`}
                    />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                    <div className="card-footer">
                      <Button outline color="primary" onClick={() => addItem(dish)}>
                        + Add To Cart
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Col>
            <Col>
                  <Cart isAuthenticated={isAuthenticated} />
            </Col>
          </Row>
          <style jsx >{`
            a {
              color: white;
            }
            a:link {
              text-decoration: none;
              color: white;
            }
            .container-fluid {
              margin-bottom: 30px;
            }
            .btn-outline-primary {
              color: #007bff !important;
            }
            a:hover {
              color: white !important;
            }
          `}
          </style>
        </React.Fragment>
    );
  }
  return <h1>Loading ...</h1>;

};

const GET_RESTAURANT_DISHES = gql`
  query($id: ID!) {
    restaurant(id: $id) {
      id
      name
      dishes {
        id
        name
        description
        price
        image {
          url
        }
      }
    }
  }
`;

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (RestaurantList)
export default compose(
  withRouter,
  graphql(GET_RESTAURANT_DISHES, {
    options: (props: Props) => {
      return {
        variables: {
          id: props.router.query.id,
        },
      };
    },
    props: ({ data }) => ({ data }),
  }),
  defaultPage,
)(Restaurants);
