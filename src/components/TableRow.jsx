import { HiOutlinePencilAlt } from "react-icons/hi";
import { BiTrash } from "react-icons/bi";
import Swal from "sweetalert2";

const TableRow = ({
  singleRowData,
  openUpdateForm,
  serial,
  fetchData,
}) => {
  const { _id, name, email, gender, status } = singleRowData;

  const deleteUserHandler = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://simple-user-management-system-server-three.vercel.app/users/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
              icon: "success",
            });
            fetchData();
          });
      }
    });
  };
  return (
    <tr className={`hover:bg-green-500 }`}>
      <td className="p-4 text-center">{serial + 1}</td>
      <td className="p-4 text-center">{_id}</td>
      <td className="p-4 text-center">{name}</td>
      <td className="p-4 text-center">{email}</td>
      <td className="p-4 text-center">{gender}</td>
      <td className="p-4 text-center">{status}</td>
      <td className="p-4 text-center">
        {/* Update user button */}
        <button
          id="updateUserButton"
          onClick={()=>openUpdateForm(_id)}
          className="p-2 rounded-lg shadow-lg bg-white cursor-pointer"
        >
          <HiOutlinePencilAlt></HiOutlinePencilAlt>
        </button>
        {/* Delete user button */}
        <button
          className="p-2 rounded-lg shadow-lg bg-white  cursor-pointer ms-4"
          onClick={deleteUserHandler}
        >
          <BiTrash></BiTrash>
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
