const FormRow = ({ label, children }) => {
  return (
    <tr className="border-b">
      <td className="p-2 font-medium w-1/4">{label}</td>
      <td className="p-2">{children}</td>
    </tr>
  );
};

export default FormRow;
