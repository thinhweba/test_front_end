import { useState } from "react";

const EditUser = ({ data, setEditFormOpen, setUsers }) => {
  const [name, setName] = useState(data.name);
  const [balance, setBalance] = useState(data.balance);
  const [email, setEmail] = useState(data.email);
  const [active, setActive] = useState(data.active);

  const updatedUser = {
    id: data.id,
    name,
    balance,
    email,
    registerAt: data.registerAt,
    active,
  };
  const editUser = async (id, updatedUser) => {
    console.log(updatedUser);
    const config = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    };
    try {
      const response = await fetch(
        `http://localhost:3004/datas/${data.id}`,
        config
      );
      const updatedUser = await response.json();
      return updatedUser;
    } catch (error) {
      console.log("Error updating product:", error);
    }
  };
  const handleSave = (id) => {
    editUser(id, updatedUser)
      .then((res) => {
        console.log(res);
        setUsers((res) => {
          const users = res.filter((z) => z._id !== updatedUser.id);
          return users;
        });
        window.location.reload();
        setEditFormOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="overlay">
      <div className="form-container">
        <h2 className="form-header">Edit User</h2>
        <div className="form-label">
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-label">
          Balance:
          <input
            className="form-input__text"
            type="text"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
          />
        </div>
        <div className="form-label">
          Email:
          <input
            className="form-input__text"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-label-status">
          Active:
          <input
            className="form-input__checkbox"
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
          />
        </div>
        <div className="button-container">
          <button
            onClick={() => handleSave(data.id)}
            className="form-button form-button-save"
          >
            Save
          </button>
          <button
            onClick={() => setEditFormOpen(false)}
            className="form-button form-button-cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
