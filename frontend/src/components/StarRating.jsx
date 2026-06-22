import { FaStar } from "react-icons/fa";

export default function StarRating({ rating, setRating }) {
  return (
    <div style={{ fontSize: "35px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          onClick={() => setRating(star)}
          color={star <= rating ? "#f59e0b" : "#d1d5db"}
          style={{ cursor: "pointer", marginRight: "10px" }}
        />
      ))}
    </div>
  );
}