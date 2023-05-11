import { useContext, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "antd";
import "./AdminLogin.scss";
import { AdminContext } from "../../contexts/AdminContext";
import { signIn } from "./../../services/AdminService";
import { message } from "antd";

function AdminLogin() {
  const adminLogin = useContext(AdminContext);
  const history = useHistory();

  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    if (adminLogin.getIsLoggedIn()) {
      history.push("/dashboard");
    }
  }, [adminLogin.getIsLoggedIn()]);

  const validateForm = () => {
    let isValid = true;
    if (!adminLogin.email) {
      isValid = false;
      emailRef.current.classList.add("invalid");
    }
    if (!adminLogin.password) {
      isValid = false;
      passwordRef.current.classList.add("invalid");
    }
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        message.open({
          type: "info",
          content: "Logging in...",
        });
        const response = await signIn(adminLogin);
        message.open({
          type: "success",
          content: "You are logged in!",
        });
        adminLogin.setLoggedIn(response.data);
        history.push("/dashboard");
      } catch (error) {
        message.open({
          type: "warning",
          content: "Something went wrong!",
        });
      }
    }
  };

  return (
    <div className="wrapper">
      <form className="form">
        <h3> Admin Login </h3>
        <div className="input-wrapper">
          <label> Email * </label>
          <input
            ref={emailRef}
            required
            type="email"
            value={adminLogin.email}
            onChange={(e) => adminLogin.setEmail(e.target.value, emailRef)}
          />
        </div>
        <div className="input-wrapper">
          <label> Password * </label>
          <input
            ref={passwordRef}
            required
            type="password"
            value={adminLogin.password}
            onChange={(e) =>
              adminLogin.setPassword(e.target.value, passwordRef)
            }
          />
        </div>
        <Button
          type="primary"
          loading={adminLogin.isLoading}
          onClick={handleSubmit}
        >
          Login
        </Button>
      </form>
    </div>
  );
}

export default AdminLogin;
