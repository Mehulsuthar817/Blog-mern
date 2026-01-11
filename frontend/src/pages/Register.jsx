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
      <div  className="min-h-screen flex items-center justify-center" >
        <form className="w-full max-w-sm p-6 border rounded-xl space-y-4" onSubmit={submit}>
          <h1 className="text-2xl font-bold text-center" >Register</h1>
          <input
            className="w-full p-2 border rounded"
            type="text"
            placeholder="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <br />
          <input
            className="w-full p-2 border rounded"
            type="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br />
          <input
            className="w-full p-2 border rounded"
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <button className="w-full bg-black text-white py-2 rounded" type="submit">register</button>
        </form>
      </div>
    </>
  );
}
