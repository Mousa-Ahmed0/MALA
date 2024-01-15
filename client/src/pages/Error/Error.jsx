import React from "react";

export default function Error() {
  return (
    <div className="container">
      <div className="w-100 h-100 row my-4">
        <div className="col-12 alert alert-danger h1 m-0 my-4 colorMain d-flex justify-content-center align-items-center">
          404!
        </div>
        <div className="col-12 my-2 h4 m-0 d-flex gap-2 justify-content-center align-items-center">
          Error! This Page is not Exist!
        </div>
      </div>
    </div>
  );
}
