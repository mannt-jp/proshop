import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import Loader from "../components/Loader";
import { cartActions } from "../store/cartSlice";
import { RootState } from "../store";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { RequestOrderType } from "../types/RequestOrderType";

const PlaceOrder = () => {
  const navigate = useNavigate();

  const cart = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const { mutate, isLoading } = useMutation({
    mutationKey: ["placeorder"],
    mutationFn: async () => {
      try {
        const body: RequestOrderType = {
          orderItems: cart.cartItems.map((cartItem) => {
            return {
              quantity: cartItem.quantity,
              productId: cartItem.product._id,
            };
          }),
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          taxPrice: cart.taxPrice,
          shippingPrice: cart.shippingPrice,
          totalPrice: cart.totalPrice,
        };
        const response = await axios.post(
          "http://localhost:8000/api/orders",
          body,
          { withCredentials: true }
        );
        dispatch(cartActions.clearCartItems);
        navigate(`/orders/${response.data._id}`);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response);
          if (!error?.response) {
            toast.error("No server response");
          } else if (error.response?.status === 400) {
            toast.error("Missing fields");
          } else {
            toast.error("Place order failed");
          }
        }
      }
    },
  });

  const dispatch = useDispatch();
  const placeOrderHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    mutate();
  };

  return (
    <>
      <CheckoutSteps
        stepTaken={["login", "shipping", "payment", "placeorder"]}
      />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.product.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.quantity} x ${item.product.price} = $
                          {item.quantity * item.product.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {/* <ListGroup.Item>
                {error (
                  <Message variant="danger">{error.data.message}</Message>
                )}
              </ListGroup.Item> */}
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
                {isLoading && <Loader />}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrder;
