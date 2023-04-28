import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "antd";
import "./AdminLogin.scss";
import { AdminContext } from "../../contexts/AdminContext";

function AdminLogin() {
  const adminLogin = useContext(AdminContext);
  const history = useHistory();

  useEffect(() => {
    if (adminLogin.getIsLoggedIn()) {
      history.push("/dashboard");
    }
  }, [adminLogin.getIsLoggedIn()]);

  const validateForm = () => {
    let isValid = true;
    if (!adminLogin.email) {
      isValid = false;
      const input = document.querySelector(".email");
      input.classList.add("invalid");
    }
    if (!adminLogin.password) {
      isValid = false;
      const input = document.querySelector(".password");
      input.classList.add("invalid");
    }
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await adminLogin.signIn(history);
    }
  };

  return (
    <div className="wrapper">
      <form className="form">
        <h3> Admin Login </h3>
        <div className="input-wrapper">
          <label> Email * </label>
          <input
            className="email"
            required
            type="email"
            value={adminLogin.email}
            onChange={(e) => adminLogin.setEmail(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <label> Password * </label>
          <input
            className="password"
            required
            type="password"
            value={adminLogin.password}
            onChange={(e) => adminLogin.setPassword(e.target.value)}
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
