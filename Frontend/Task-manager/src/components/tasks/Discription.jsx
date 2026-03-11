import { useState } from "react";

const Dis = ({ text = "" }) => {
  const [expanded, setExpanded] = useState(false);

  if (!text) return <span>-</span>;

  const limit = 100;
  const isLong = text.length > limit;

  return (
    <div className="text-sm text-gray-700 whitespace-normal break-words">
      {expanded ? text : text.slice(0, limit)}
      {!expanded && isLong && "..."}

      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="ml-2 text-xs text-blue-600 hover:text-blue-800"
        >
          {expanded ? "See Less" : "See More"}
        </button>
      )}
    </div>
  );
};

export default Dis;
