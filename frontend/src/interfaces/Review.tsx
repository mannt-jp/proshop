import User, { isUser } from "./User";

export default interface Review {
  user: User;
  name: string;
  rating: number;
  comment: string;
}

export const isReview = (arg: any): arg is Review => {
  return (
    arg &&
    arg.user &&
    isUser(arg.user) &&
    arg.name &&
    typeof arg.name === "string" &&
    arg.rating &&
    typeof arg.rating === "number" &&
    arg.comment &&
    typeof arg.comment === "string"
  );
};

export const isListofReviews = (arg: any): arg is Review[] => {
  return Array.isArray(arg) && arg.every((item) => isReview(item));
};
