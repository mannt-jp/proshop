import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserType } from "../types/UserType";
import { useMutation } from "@tanstack/react-query";
import { authActions } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import CheckoutSteps from "../components/CheckoutSteps";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setCredentials } = authActions;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const { isLoading, mutate } = useMutation({
    mutationKey: ["users", "login"],
    mutationFn: async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/users/login",
          {
            email,
            password,
          },
        );
        console.log(response.data);
        dispatch(setCredentials(response.data as UserType));
        navigate(redirect);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (!error?.response) {
            toast.error("No server response");
          } else if (error.response?.status === 400) {
            toast.error("Missing username or password!");
          } else if (error.response?.status === 401) {
            toast.error("Invalid username or password!");
          } else {
            toast.error("Login Failed");
          }
        }
      }
    },
  });
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate();
  };
  return (
    <FormContainer>
      <CheckoutSteps stepTaken={["login"]}></CheckoutSteps>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button disabled={isLoading} type="submit" variant="primary">
          Sign In
        </Button>

        {isLoading && <Loader />}
      </Form>

      <Row className="py-3">
        <Col>
          New Customer? <Link to={"/register"}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Login;
