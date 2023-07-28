import { Link, Navigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { ProductType } from "../types/ProductType";
import { useState } from "react";
import { cartActions } from "../store/cartSlice";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const cart = useSelector((state: RootState) => state.cart);
  console.log(cart);
  const dispatch = useDispatch();
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/products/${productId}`
        );
        return response.data as ProductType;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (!error?.response) {
            toast.error("No server response");
          } else if (error.response?.status === 500) {
            toast.error("Product not found!");
          } else {
            toast.error("Login Failed");
          }
        }
      }
    },
  });
  const addToCartHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (product) dispatch(cartActions.addToCart({ product, quantity }));
  };
  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {isLoading ? (
        <Loader></Loader>
      ) : isError ? (
        <p>Error fetching product</p>
      ) : (
        <Row>
          <Col md={5}>
            <Image src={product?.image} alt={product?.name}></Image>
          </Col>
          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product?.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  rating={product?.rating ? product.rating : 0}
                  numReviews={product?.numReviews ? product.numReviews : 0}
                ></Rating>
              </ListGroup.Item>
              <ListGroup.Item>{product?.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product?.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <strong>
                        {product?.countInStock && product?.countInStock > 0
                          ? "In Stock"
                          : "Out Of Strock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product?.countInStock && product?.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Quantity:</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={quantity}
                          onChange={(e) =>
                            setQuantity(parseInt(e.target.value))
                          }
                        >
                          {[...Array(product?.countInStock).keys()].map((q) => (
                            <option key={q + 1} value={q + 1}>
                              {q + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={
                      !product?.countInStock || product?.countInStock === 0
                    }
                    onClick={addToCartHandler}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};
export default ProductDetail;
