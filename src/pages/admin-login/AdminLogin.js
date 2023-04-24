import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "antd";
import "./AdminLogin.scss";
import { AdminContext } from "./../../contexts/AdminContext";

function AdminLogin() {
  const adminLogin = useContext(AdminContext);
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    await adminLogin.signIn(history);
  };

  return (
    <div className="wrapper">
      <form className="form">
        <h3> Admin Login </h3>{" "}
        <div className="input-wrapper">
          <label> Email: </label>{" "}
          <input
            required
            type="email"
            value={adminLogin.email}
            onChange={(e) => adminLogin.setEmail(e.target.value)}
          />{" "}
        </div>{" "}
        <div className="input-wrapper">
          <label> Password: </label>{" "}
          <input
            required
            type="password"
            value={adminLogin.password}
            onChange={(e) => adminLogin.setPassword(e.target.value)}
          />{" "}
        </div>{" "}
        <Button type="primary" loading={loading} onClick={handleSubmit}>
          {" "}
          Login{" "}
        </Button>{" "}
      </form>{" "}
    </div>
  );
}

export default AdminLogin;
