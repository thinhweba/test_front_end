import "./App.css";
import React, { useEffect, useState } from "react";
import "./index.css";
import EditUser from "./components/EditUser";
function App() {
  const [editingUser, setEditingUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const npage = Math.ceil(totalRecords / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const [isEditFormOpen, setEditFormOpen] = useState(false);
  const handleDelete = (userId) => {
    fetch(`http://localhost:3004/datas/${userId}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        const updatedUsers = users.filter((user) => user.id !== userId);
        setUsers(updatedUsers);
      }
    });
  };
  const handleEdit = (userId) => {
    console.log(userId);
    const userToEdit = users.find((user) => user.id === userId);
    setEditingUser(userToEdit);
    setEditFormOpen(true);
  };

  useEffect(() => {
    fetch(
      `http://localhost:3004/datas/?_page=${currentPage}&_limit=${recordsPerPage}`
    )
      .then((res) => {
        setTotalRecords(res.headers.get("X-Total-Count"));
        return res.json();
      })
      .then((res) => {
        setUsers(res);
      });
  }, [currentPage]);

  return (
    <div className="App">
      <table class="table">
        <thead>
          <tr class="table__rowtable__header">
            <th class="table__cell">ID</th>
            <th class="table__cell">Name</th>
            <th class="table__cell">Balance</th>
            <th class="table__cell">Email</th>
            <th class="table__cell">Registration</th>
            <th class="table__cell">Status</th>
            <th class="table__cell">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((data, i) => (
            <tr key={i} class="table__row">
              <td class="table__cell">
                <div className="table__cell-id">{data.id}</div>
              </td>
              <td class="table__cell">
                <div className="table__cell-name">
                  <input type="checkbox"></input>
                  {data.name}
                </div>
              </td>
              <td class="table__cell">
                <div className=".table__cell-balance">
                  {
                    new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    })
                      .format(data.balance)
                      .split(".")[0]
                  }
                </div>
              </td>
              <td class="table__cell">
                <div className="table__cell-email">
                  <a className="link__fb" href={`mailto:${data.email}`}>
                    {data.email}
                  </a>
                </div>
              </td>
              <td className="table__cell tooltip">
                <div className="table__cell-date">
                  {new Date(data.registerAt).toLocaleDateString("en-US", {
                    year: "numeric",
                  })}
                  /
                  {new Date(data.registerAt).toLocaleDateString("en-US", {
                    month: "numeric",
                  })}
                  /
                  {new Date(data.registerAt).toLocaleDateString("en-US", {
                    day: "numeric",
                  })}
                  <span className="tooltiptext">
                    {new Date(data.registerAt).toLocaleTimeString("en-US", {
                      hour12: false,
                      hour: "2-digit",
                    })}{" "}
                    hours{" : "}
                    {new Date(data.registerAt).toLocaleTimeString("en-US", {
                      second: "2-digit",
                    })}{" "}
                    Seconds
                  </span>
                </div>
              </td>
              <td class="table__cell">
                <div className="table__cell-status">
                  {data.active && (
                    <div className="table__cell table__cell--active">
                      <span className="table__cell-text--active">Active</span>
                    </div>
                  )}
                </div>
              </td>
              <td class="table__cell">
                <div class="table__button">
                  <div
                    className="table__button-edit"
                    onClick={(e) => {
                      handleEdit(data.id);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                      />
                    </svg>
                  </div>
                  <div
                    className="table__button-delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(data.id);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        onClick={() => {
                          handleDelete(data.id);
                        }}
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                      />
                    </svg>
                  </div>
                </div>
              </td>
              {isEditFormOpen && (
                <EditUser
                  data={editingUser}
                  setEditFormOpen={setEditFormOpen}
                  setUsers={setUsers}
                />
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="footer">
        <div className="navipage">
          <ul className="pagination pagination--active">
            <li className="page-item">
              <a href="#" className="page-link" onClick={prePage}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </a>
            </li>
            {numbers.map((n, i) => (
              <li
                className={`page-item ${currentPage === n ? "active" : ""}`}
                key={i}
              >
                <a
                  href="#"
                  className="page-link"
                  onClick={() => changeCPage(n)}
                >
                  {n}
                </a>
              </li>
            ))}

            <li className="page-item">
              <a href="#" className="page-link" onClick={nextPage}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  function prePage() {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  }
  function changeCPage(id) {
    setCurrentPage(id);
  }
  function nextPage() {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  }
}

export default App;
