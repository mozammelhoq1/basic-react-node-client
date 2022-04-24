import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleAddUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const user = { name, email };

    console.log(user);
    // send data to server

    fetch("http://localhost:5000/user", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        const newUsers = [...users, data];
        setUsers(newUsers);
        console.log(data);
      });
  };
  return (
    <div className="App">
      <h1>My own data : {users.length}</h1>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="" placeholder="your name" required />
        <input
          type="email"
          name="email"
          id=""
          placeholder="your email"
          required
        />
        <input type="submit" value="Add User" />
      </form>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} & {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
