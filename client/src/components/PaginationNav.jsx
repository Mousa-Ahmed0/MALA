import React from "react";

export default function PaginationNav({ counts, pageNo, setPageNo }) {
  function displyPaginationItems() {
    let result = [];
    for (let i = 0; i < counts / 3; i++) {
      result.push(
        <li className="page-item" onClick={() => setPageNo(i + 1)} key={i}>
          <a className="page-link">{i + 1}</a>
        </li>
      );
    }
    return result;
  }
  return (
    <>
      {" "}
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li className={`page-item ${pageNo === 1 ? "disabled" : ""}`}>
            <a
              className="page-link"
              onClick={() => {
                setPageNo((prevNo) => prevNo - 1);
              }}
            >
              Previous
            </a>
          </li>
          {displyPaginationItems()}
          <li
            className={`page-item ${pageNo === counts / 3 ? "disabled" : ""}`}
          >
            <a
              className="page-link"
              onClick={() => {
                setPageNo((prevNo) => prevNo + 1);
              }}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
