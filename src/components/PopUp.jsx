import React, { useState } from "react";

const PopUp = ({ children, isPopUpActive, popUpVisibilityHandler }) => {
  // const[isActive,setIsActive] = useState(false);

  return (
    <div
      onClick={popUpVisibilityHandler}
      className={`w-full h-screen fixed backdrop-blur-sm justify-center items-center ${
        isPopUpActive ? "hidden" : "flex"
      }`}
    >
      {/* Handling event bubbling. stopPropagation() function should be called from the children */}
      <div onClick={(event) => event.stopPropagation()}>{children}</div>
    </div>
  );
};

export default PopUp;
