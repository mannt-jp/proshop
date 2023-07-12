import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ProductType } from "./Home";

const Products = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:8000/api/products");
      return response.data as ProductType[];
    },
  });
  return (
    <>
      <h1>Latest products</h1>
      {
        <Row>
          {isLoading
            ? "Loading..."
            : isError
            ? "Error fetching products!"
            : products?.map((product) => {
                return (
                  <Col
                    key={product._id}
                    sm={12}
                    md={6}
                    lg={4}
                    xl={3}
                    className="flex"
                  >
                    <Product product={product}></Product>
                  </Col>
                );
              })}
        </Row>
      }
    </>
  );
};
export default Products;
