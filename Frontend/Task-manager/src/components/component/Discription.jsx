import { useState } from "react";

const Des  = ({ text }) => {
  const [showMore, setShowMore] = useState(false);

  const maxLength = 120; 

  return (
    <div className="text-sm mt-2 ">
      {showMore ? text : text.slice(0, maxLength)}

      {text.length > maxLength && (
        <span
          onClick={() => setShowMore(!showMore)}
          style={{ color: "blue", cursor: "pointer", marginLeft: "5px" }}
        >
          {showMore ? "See less" : "See more"}
        </span>
      )}
    </div>
  );
};

export default Des;
