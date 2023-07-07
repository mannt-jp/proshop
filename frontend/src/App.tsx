import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
const App = () => {
  return (
    <>
      <Header></Header>
      <main className="py-3">
        <Container>
          <h1 className="text-3xl">Welcome to ProShop</h1>
        </Container>
      </main>
      <Footer></Footer>
    </>
  );
};
export default App;
