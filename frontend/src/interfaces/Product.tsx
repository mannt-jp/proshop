import Review, { isListofReviews } from "./Review";
import User, { isUser } from "./User";

export default interface Product {
  _id: string;
  user: User;
  name: string;
  image: string;
  brand: string;
  category: string;
  description: string;
  reviews: Review[];
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
}

export const isProduct = (arg: any): arg is Product => {
  return (
    arg &&
    arg._id &&
    typeof arg._id === "string" &&
    arg.user &&
    isUser(arg.user) &&
    arg.name &&
    typeof arg.name === "string" &&
    arg.image &&
    typeof arg.image === "string" &&
    arg.brand &&
    typeof arg.brand === "string" &&
    arg.category &&
    typeof arg.category === "string" &&
    arg.description &&
    typeof arg.description === "string" &&
    arg.reviews &&
    isListofReviews(arg.reviews) &&
    arg.rating &&
    typeof arg.rating === "number" &&
    arg.numReviews &&
    typeof arg.numReviews === "number" &&
    arg.price &&
    typeof arg.price === "number" &&
    arg.countInStock &&
    typeof arg.countInStock === "number"
  );
};
