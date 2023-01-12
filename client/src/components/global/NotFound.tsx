import React from "react";

const NotFound = () => {
  return (
    <div
      className="position-relative"
      style={{ minHeight: "calc(100vh - 120px)", width:"100%" }}
    >
      <h2
        className="position-absolute"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          backgroundColor: "black",
          padding: "1rem 2rem",
          color: "white",
        }}
      >
        404 | NotFound
      </h2>
    </div>
  );
};

export default NotFound;
