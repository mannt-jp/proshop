import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({
  rating,
  numReviews,
}: {
  rating: number;
  numReviews: number;
}) => {
  let stars = [...Array(Math.floor(rating))].map(() => <FaStar key={crypto.randomUUID()}></FaStar>);
  if (stars.length) {
    const halfStarCount = Math.floor((rating - stars.length) / 0.5);
    stars = stars.concat(
      [...Array(halfStarCount)].map(() => <FaStarHalfAlt key={crypto.randomUUID()}></FaStarHalfAlt>)
    );
    const emptyStarCount = 5 - stars.length;
    if (emptyStarCount >= 1) {
      stars = stars.concat(
        [...Array(emptyStarCount)].map(() => <FaRegStar key={crypto.randomUUID()}></FaRegStar>)
      );
    }
  }
  return (
    <div className="flex justify-between">
      <div className="flex">{stars}</div>
      <span className="rating-text">
        {numReviews > 1 ? `${numReviews} reviews` : `${numReviews} review`}
      </span>
    </div>
  );
};
export default Rating;
