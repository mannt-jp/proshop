import { Link, useParams } from "react-router-dom";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import Rating from "../components/Rating";
import { useQuery } from "@tanstack/react-query";
import { ProductType } from "./Home";
import axios from "axios";

const ProductDetail = () => {
  const { productId } = useParams();
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:8000/api/products/${productId}`
      );
      return response.data as ProductType;
    },
  });
  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {isLoading ? (
        <p>Loading...</p>
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
                  rating={product?.rating ? product?.rating : 0}
                  numReviews={product?.numReviews ? product?.numReviews : 0}
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
                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={
                      !product?.countInStock || product?.countInStock === 0
                    }
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
