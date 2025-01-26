import { useEffect } from "react";
import "./App.css";
import { useState } from "react";
import TableRow from "./components/TableRow";
import { FaUserPlus } from "react-icons/fa6";
import PopUp from "./components/PopUp";
import Swal from "sweetalert2";

function App() {
  const [data, setData] = useState([]);
  const [isPopUpActive, setIsPopUpActive] = useState(true);
  console.log(data);

  //This handler controls whether the popup screen should be visible or not
  const popUpVisibilityHandler = (event) => {
    event.stopPropagation();
    setIsPopUpActive(!isPopUpActive);
  };
  // Loading data
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  //Form submission handler
  const submitHandler = (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const name = form.get("name");
    const email = form.get("email");
    const gender = form.get("gender");
    const status = form.get("status");
    const userData = { name, email, gender, status };

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then(({ insertedId }) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User has been created successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        event.target.reset();
      });
  };

  return (
    <>
      <PopUp
        popUpVisibilityHandler={popUpVisibilityHandler}
        isPopUpActive={isPopUpActive}
      >
        {/* Getting user information using a form */}
        <div className="shadow-lg h-96 w-4xl bg-white px-6 py-3 ">
          <h1 className="text-3xl text-center mb-4">User Information</h1>
          <form onSubmit={submitHandler}>
            <label htmlFor="name">Name</label> <br />
            <input
              type="text"
              id="name"
              name="name"
              className="border border-gray-400 rounded-md w-full p-2 my-2"
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="border border-gray-400 rounded-md w-full p-2 my-2"
            />
            <br />
            <div className="my-4">
              <label>
                Gender
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  className="mx-3"
                />
                Male
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  className="mx-3"
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
                />
                Active
                <input
                  type="radio"
                  name="status"
                  value="inactive"
                  className="mx-3"
                />
                Inactive
              </label>
            </div>
            <button
              type="submit"
              className="shadow-lg cursor-pointer w-full bg-green-600 hover:bg-green-400 py-3"
              onClick={popUpVisibilityHandler}
            >
              Save
            </button>
          </form>
        </div>
      </PopUp>

      <div className="h-screen flex items-center justify-center">
        <div className="h-96 max-w-6xl w-full">
          <p className="text-xl md:text-2xl lg:text-4xl text-center">
            Simple user management system
          </p>
          <div>
            <button
              className="shadow-lg px-4 py-2 rounded-lg flex items-center justify-center gap-4 cursor-pointer text-violet-600 hover:bg-gray-50"
              onClick={popUpVisibilityHandler}
            >
              New User <FaUserPlus></FaUserPlus>
            </button>
          </div>
          <table className="w-full table-auto mt-5">
            <tbody>
              <tr className="bg-slate-800 text-white">
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
                  popUpVisibilityHandler={popUpVisibilityHandler}
                ></TableRow>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
