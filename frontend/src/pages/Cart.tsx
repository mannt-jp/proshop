import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../store";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import Message from "../components/Message";
import { FaTrash } from "react-icons/fa";
import { cartActions } from "../store/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const { cartItems } = cart;
  const numberOfItems = cartItems.reduce(
    (prev, curr) => prev + curr.quantity,
    0
  );
  const checkOut = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    navigate("/shipping")
  };
  return (
    <Row>
      <Col md={8}>
        <h1 className="mb-[20px]">Shopping Cart</h1>
        {cartItems.length !== 0 ? (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product._id}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fluid
                      rounded
                    ></Image>
                  </Col>
                  <Col md={3}>
                    <Link to={`/products/${item.product._id}`}>
                      {item.product.name}
                    </Link>
                  </Col>
                  <Col md={2}>${item.product.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.quantity}
                      onChange={(e) => {
                        dispatch(
                          cartActions.changeQuantity({
                            productId: item.product._id,
                            quantity: parseInt(e.target.value),
                          })
                        );
                      }}
                    >
                      {[...Array(item.product.countInStock).keys()].map((q) => (
                        <option key={q + 1} value={q + 1}>
                          {q + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => {
                        dispatch(
                          cartActions.changeQuantity({
                            productId: item.product._id,
                            quantity: 0,
                          })
                        );
                      }}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <>
            <Message>Your cart is empty</Message>
            <Link to="">Go Back</Link>
          </>
        )}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({numberOfItems}) item{numberOfItems > 1 && "s"}
              </h2>
              $
              {cartItems.reduce(
                (prev, curr) => prev + curr.quantity * curr.product.price,
                0
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkOut}
              >
                Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};
export default Cart;
