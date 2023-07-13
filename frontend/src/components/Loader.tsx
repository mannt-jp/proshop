import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div className="block m-auto text-center">
      <Spinner animation="border" role="status"></Spinner>
    </div>
  );
};
export default Loader;
