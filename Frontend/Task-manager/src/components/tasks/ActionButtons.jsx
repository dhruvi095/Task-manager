const ActionButton = ({ children, className = "", ...props }) => {
  return (
    <button
      {...props}
      className={`px-3 py-1 text-white border border-black rounded ${className}`}
    >
      {children}
    </button>
  );
};

export default ActionButton;
