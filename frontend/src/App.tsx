import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import { Provider } from "react-redux";
import store from "./store/index";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import PrivateRouteLayout from "./pages/PrivateRouteLayout";
import Shipping from "./pages/Shipping";
import Payment from "./pages/Payment";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";
import AdminRouteLayout from "./pages/AdminRouteLayout";
import OrderList from "./pages/admin/OrderList";
import UserList from "./pages/admin/UserList";
import ProductList from "./pages/admin/ProductList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      { index: true, element: <Home></Home> },
      { path: "cart", children: [{ index: true, element: <Cart></Cart> }] },
      { path: "login", element: <Login></Login> },
      { path: "register", element: <Register></Register> },
      {
        path: "shipping",
        element: <PrivateRouteLayout></PrivateRouteLayout>,
        children: [{ index: true, element: <Shipping></Shipping> }],
      },
      {
        path: "payment",
        element: <PrivateRouteLayout></PrivateRouteLayout>,
        children: [{ index: true, element: <Payment></Payment> }],
      },
      {
        path: "placeorder",
        element: <PrivateRouteLayout></PrivateRouteLayout>,
        children: [{ index: true, element: <PlaceOrder></PlaceOrder> }],
      },
      {
        path: "orders",
        element: <PrivateRouteLayout></PrivateRouteLayout>,
        children: [{ path: ":id", element: <Order></Order> }],
      },
      {
        path: "admin",
        element: <AdminRouteLayout></AdminRouteLayout>,
        children: [
          { path: "users", element: <UserList></UserList> },
          { path: "products", element: <ProductList></ProductList> },
          { path: "orders", element: <OrderList></OrderList> },
        ],
      },
      {
        path: "products",
        children: [
          { index: true, element: <Products></Products> },
          { path: ":productId", element: <ProductDetail></ProductDetail> },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  );
};
export default App;
