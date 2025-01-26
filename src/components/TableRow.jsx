import { HiOutlinePencilAlt } from "react-icons/hi";
import { BiTrash } from "react-icons/bi";


const TableRow = ({ singleRowData,popUpVisibilityHandler }) => {
  const { _id, name, email, gender, status } = singleRowData;
 

  return (
    <tr  className={`hover:bg-green-500 }`}>
      <td className="p-4 text-center">{_id}</td>
      <td className="p-4 text-center">{name}</td>
      <td className="p-4 text-center">{email}</td>
      <td className="p-4 text-center">{gender}</td>
      <td className="p-4 text-center">{status}</td>
      <td className="p-4 text-center">
        <button onClick={popUpVisibilityHandler} className="p-2 rounded-lg shadow-lg bg-white cursor-pointer">
          <HiOutlinePencilAlt></HiOutlinePencilAlt>
        </button>
        <button className="p-2 rounded-lg shadow-lg bg-white  cursor-pointer ms-4">
          <BiTrash></BiTrash>
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
