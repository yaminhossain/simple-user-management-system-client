import { useEffect, useState } from "react";
import "./App.css";
import TableRow from "./components/TableRow";
import { FaUserPlus } from "react-icons/fa6";
import PopUp from "./components/PopUp";
import Swal from "sweetalert2";

function App() {
  const [data, setData] = useState([]);
  const [isPopUpActive, setIsPopUpActive] = useState(true);
  /*  As I have one form and two different button which perform two different kind of work, for this I have taken a state which
  task is to distinguish their tasks. The action type state will do this for me*/
  const [actionType, setActionType] = useState(null); // To track action type
  // This state collects the selected user ID for PUT api
  const [selectedUserId, setSelectedUserId] = useState(null); // For updating a specific user
  // Fetch data from the database. This function is taken because when a new user is added to the database, the new data should be fetched again.
  const fetchData = () => {
    fetch("https://simple-user-management-system-server-three.vercel.app/users")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error fetching data:", err));
  };

  // Load data on component mount
  useEffect(() => {
    fetchData();
  }, []);
  // This handler controls whether the popup screen should be visible or not
  const popUpVisibilityHandler = () => {
    setIsPopUpActive(!isPopUpActive);
  };
  // Form submission handler
  const submitHandler = (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const name = form.get("name");
    const email = form.get("email");
    const gender = form.get("gender");
    const status = form.get("status");
    const userData = { name, email, gender, status };

/*--------------------------------------------------- 
      CREATE a new user
-----------------------------------------------------*/

    if (actionType === "create") {
      // POST API for creating a user
      fetch("https://simple-user-management-system-server-three.vercel.app/users/", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((res) => res.json())
        .then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User has been created successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          fetchData();
          popUpVisibilityHandler();
        })
        .catch((err) => {
          console.error("Error adding user:", err);
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Failed to create user",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    } 
    /*--------------------------------------------------- 
      UPDATE a user data
      -----------------------------------------------------*/
    
    else if (actionType === "update" && selectedUserId) {
      // PUT API for updating a user
      fetch(`https://simple-user-management-system-server-three.vercel.app/users/${selectedUserId}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User has been updated successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          fetchData();
          popUpVisibilityHandler();
        })
        .catch((err) => {
          console.error("Error updating user:", err);
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Failed to update user",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    }

    event.target.reset();
    setIsPopUpActive(false);
  };
  // This function will handle the events of new user creation button
  const openCreateForm = () => {
    setActionType("create");
    setSelectedUserId(null);
    popUpVisibilityHandler();
  };
  // This function will handle the events of updata user information button
  const openUpdateForm = (userId) => {
    setActionType("update");
    setSelectedUserId(userId);
    popUpVisibilityHandler();
  };

  return (
    <>
      <PopUp
        popUpVisibilityHandler={popUpVisibilityHandler}
        isPopUpActive={isPopUpActive}
      >
        {/* Getting user information using a form */}
        <div className="shadow-lg w-4xl bg-white px-6 py-3">
          <h1 className="text-3xl text-center mb-4">
            {actionType === "create" ? "Add New User" : "Update User"}
          </h1>
          <form onSubmit={submitHandler}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="border border-gray-400 rounded-md w-full p-2 my-2"
              required
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="border border-gray-400 rounded-md w-full p-2 my-2"
              required
            />
            <div className="my-4">
              <label>
                Gender
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  className="mx-3"
                  required
                />
                Male
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  className="mx-3"
                  required
                />
                Female
              </label>
            </div>
            <div className="my-4">
              <label>
                Status
                <input
                  type="radio"
                  name="status"
                  value="active"
                  className="mx-3"
                  required
                />
                Active
                <input
                  type="radio"
                  name="status"
                  value="inactive"
                  className="mx-3"
                  required
                />
                Inactive
              </label>
            </div>
            <button
              type="submit"
              className="shadow-lg cursor-pointer w-full bg-green-600 hover:bg-green-400 py-3"
            >
              {actionType === "create" ? "Save User" : "Update User"}
            </button>
          </form>
        </div>
      </PopUp>

      <div className="h-screen flex items-center justify-center">
        <div className="h-96 max-w-6xl w-full">
          <p className="text-xl md:text-2xl lg:text-4xl text-center">
            Simple user management system
          </p>
          <button
            id="newUserButton"
            className="shadow-lg px-4 py-2 rounded-lg flex items-center justify-center gap-4 cursor-pointer text-violet-600 hover:bg-gray-50"
            onClick={openCreateForm}
          >
            New User <FaUserPlus></FaUserPlus>
          </button>
          <table className="w-full table-auto mt-5">
            <tbody>
              <tr className="bg-slate-800 text-white">
                <th className="py-2">Serial</th>
                <th className="py-2">User ID</th>
                <th className="py-2">Name</th>
                <th className="py-2">@Email</th>
                <th className="py-2">Gender</th>
                <th className="py-2">Status</th>
                <th className="py-2">Action</th>
              </tr>
              {data.map((singleRowData, index) => (
                <TableRow
                  key={singleRowData._id}
                  serial={index}
                  singleRowData={singleRowData}
                  fetchData={fetchData}
                  openUpdateForm={openUpdateForm}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
