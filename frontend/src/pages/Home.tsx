import { Row, Col } from "react-bootstrap";
import ProductComponent from "../components/Product";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { ProductType } from "../types/ProductType";
import { toast } from "react-toastify";

const Home = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/products");
        return response.data as ProductType[];
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (!error?.response) {
            toast.error("No server response");
          } else {
            toast.error("Failed to fetch products");
          }
        }
      }
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
            <Message variant="danger">Failed to load data</Message>
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
export default Home;
