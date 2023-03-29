import { AiFillStar } from "react-icons/ai";
function StarCounter({ rating, color }) {
  const stars = [];

  for (let i = 0; i < rating; i++) {
    stars.push(i);
  }

  return (
    <h2 style={{ display: "flex", gap: "5px" }}>
      Rating:
      {stars.map((star, i) => (
        <span style={{ marginTop: "2px" }} key={i}>
          <AiFillStar color={color} />
        </span>
      ))}
    </h2>
  );
}

export default StarCounter;
