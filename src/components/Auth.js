import { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);

  const authCtx = useContext(AuthContext)

  const submitHandler = (e) => {
    e.preventDefault();

    const url = "https://socialmtn.devmountain.com";

    const body = {
      username,
      password,
    };

    axios
      .post(register ? `${url}/register` : `${url}/login`, body)
      .then((res) => {
        console.log(res.data);
        authCtx.login(res.data.token, res.data.exp, res.data.userId)
      })
      .catch((err) => {
        setPassword("");
        setUsername("");
      });

    console.log("submitHandler called");
  };

  const emailHandler = (event) => {
    setUsername(event.target.value);
  };

  return (
    <main>
      <h1>Welcome!</h1>
      <form className="form auth-form" onSubmit={submitHandler}>
        <input
          className="form-input"
          type="text"
          placeholder="Enter email address"
          value={username}
          onChange={emailHandler}
        />
        <input
          className="form-input"
          type="text"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="form-btn">{register ? "Sign Up" : "Login"}</button>
      </form>
      <button className="form-btn" onClick={() => setRegister(!register)}>
        Need to {register ? "Login" : "Sign Up"}?
      </button>
    </main>
  );
};

export default Auth;
