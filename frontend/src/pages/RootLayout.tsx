import Footer from "../layout/Footer";
import Header from "../layout/Header";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
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