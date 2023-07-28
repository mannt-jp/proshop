import { Row, Col } from "react-bootstrap";
import ProductComponent from "../components/Product";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";
import {ProductType} from "../types/ProductType";

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
          {isLoading ? (
            <Loader></Loader>
          ) : isError ? (
            "Error fetching products!"
          ) : (
            products?.map((product) => {
              return (
                <Col
                  key={product._id}
                  sm={12}
                  md={6}
                  lg={4}
                  xl={3}
                  className="flex"
                >
                  <ProductComponent product={product}></ProductComponent>
                </Col>
              );
            })
          )}
        </Row>
      }
    </>
  );
};
export default Products;
