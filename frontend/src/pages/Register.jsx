import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();

  const submit = async (e) => {
    try {
      e.preventDefault();
      await register(name, email, password);
    } catch (err) {
      alert("Required all fields");
      console.error(err);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={submit}>
          <input
            className="iform"
            type="text"
            placeholder="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <br />
          <input
            className="iform"
            type="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br />
          <input
            className="iform"
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <button type="submit">register</button>
        </form>
      </div>
    </>
  );
}
