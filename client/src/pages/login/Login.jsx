import "./login.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { publicRequest } from "../../requestMethod";
import { useDispatch } from "react-redux";
import { loginFaulire, loginStart, loginSuccess } from "../../redux/userSlice";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    setError(false);

    try {
      if (username && password) {
        const res = await publicRequest.post("auth/login", {
          username,
          password,
        });
        dispatch(loginSuccess(res.data));
        res.data && window.location.replace("/");
      } else alert("Please Enter Your Data ~!");
    } catch (error) {
      dispatch(loginFaulire());
      alert(error.message);
      console.log(error.message);
      setError(true);
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleLogin}>
        <label>Username</label>
        <input
          type="text"
          placeholder="Username.. "
          className="loginInput"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Password.. "
          className="loginInput"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="loginButton" type="submit">
          Login
        </button>
        {error && <span className="error">Something Wrong ~!!</span>}
      </form>

      <NavLink to="/register" className="link">
        <button className="loginRegisterButton">Register</button>
      </NavLink>
    </div>
  );
}

export default Login;
