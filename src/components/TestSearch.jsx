import PageTitleBar from "@/components/ui/PageTitleBar";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import users from "@/dummy-dataset/users";

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}
export default function Index() {
  const [searchInput, setSearchInput] = useState("");
  const handleSearch = debounce((input) => {
    setSearchInput(input);
  }, 300);
  return (
    <>
      {" "}
      <Head>
        <title>User List</title>{" "}
      </Head>
      <PageTitleBar title="User List" />{" "}
      <div className=" ">
        {" "}
        <div className="m-3 m-md-5 p-3 p-md-5 bg-white shadow-md rounded overflow-x-scroll">
          {" "}
          <div className="mb-3 ">
            {" "}
            <input
              className="form-control"
              type="text"
              placeholder="Search User"
              aria-label="default input example"
              style={{ width: "300px" }}
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
            />{" "}
          </div>{" "}
          <table className="table table-responsive">
            {" "}
            <thead>
              {" "}
              <tr>
                <th scope="col">#</th> <th scope="col">First Name</th>{" "}
                <th scope="col">Last Name</th> <th scope="col">Email</th>{" "}
                <th scope="col">Designation</th> <th scope="col">Status</th>{" "}
              </tr>{" "}
            </thead>{" "}
            <tbody>
              {" "}
              {users
                .filter((user) =>
                  searchInput !== ""
                    ? Object.values(user).some(
                        (value) =>
                          (typeof value === "string" ||
                            typeof value === "number") &&
                          value
                            .toString()
                            .toLowerCase()
                            .includes(searchInput.toLowerCase())
                      )
                    : true
                )
                .map((user) => (
                  <tr key={user.id}>
                    <th scope="row">{user.id}</th>
                    <td>{user.firstName}</td> <td>{user.lastName}</td>{" "}
                    <td>{user.email}</td> <td>{user.designation}</td>{" "}
                    <td>
                      {" "}
                      <span
                        className={`badge p-1 pe-2 ${
                          user.status === "Permitted"
                            ? "text-primary-emphasis bg-primary-subtle border border-primary-subtle"
                            : "text-dark-emphasis bg-light-subtle border border-dark-subtle"
                        } rounded-pill`}
                      >
                        {user.status}{" "}
                      </span>{" "}
                    </td>{" "}
                  </tr>
                ))}{" "}
            </tbody>{" "}
          </table>{" "}
          <nav
            aria-label="Page navigation"
            className="d-flex justify-content-end"
          >
            {" "}
            <ul className="pagination">
              {" "}
              <li className="page-item">
                <a className="page-link" href="#">
                  Previous
                </a>
              </li>{" "}
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>{" "}
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>{" "}
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>{" "}
              <li className="page-item">
                <a className="page-link" href="#">
                  Next
                </a>
              </li>{" "}
            </ul>{" "}
          </nav>{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
}
