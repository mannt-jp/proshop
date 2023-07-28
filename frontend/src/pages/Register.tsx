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

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
    mutationKey: ["users", "signup"],
    mutationFn: async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/users/signup",
          {
            email,
            name,
            password,
          }
        );
        dispatch(setCredentials(response.data as UserType));
        navigate(redirect);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (!error?.response) {
            toast.error("No server response.");
          } else if (error.response?.status === 400) {
            toast.error("Missing fields");
          } else if (error.response?.status === 401) {
            toast.error("User already exists!");
          } else {
            toast.error("Sign up failed");
          }
        }
      }
    },
  });
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password === confirmPassword) mutate();
    else toast.error("Wrong confirm password!");
  };
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

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

        <Form.Group className="my-2" controlId="confirm-password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button disabled={isLoading} type="submit" variant="primary">
          Sign Up
        </Button>

        {isLoading && <Loader />}
      </Form>

      <Row className="py-3">
        <Col>
          Already have an account? <Link to={"/login"}>Log in</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Register;
