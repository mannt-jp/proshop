import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css'
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <ToastContainer />
      <Header></Header>
      <main className="py-3">
        <Container>
          <Outlet></Outlet>
        </Container>
      </main>
      <Footer></Footer>
    </>
  );
};
export default RootLayout;
