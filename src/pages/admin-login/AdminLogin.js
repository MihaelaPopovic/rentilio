import { useContext } from "react";
import { AdminContext } from "./../../contexts/AdminContext";
import "./AdminLogin.scss";
import Loader from "./../../components/loader/Loader";
import { useHistory } from "react-router-dom";

const AdminLogin = () => {
  const adminLogin = useContext(AdminContext);
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
   await adminLogin.signIn(history); 

  };
  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit} className="form">
        <h3> Admin Login </h3>
        <div className="input-wrapper">
          <label> Email: </label>
          <input
          required
            type="email"
            value={adminLogin.email}
            onChange={(e) => adminLogin.setEmail(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <label> Password: </label>
          <input
          required
            type="password"
            value={adminLogin.password}
            onChange={(e) => adminLogin.setPassword(e.target.value)}
          />
        </div>

        {!adminLogin.isLoading && (
        <button type="submit" className="btn btn-fill">
          Login
        </button>
        )}
        
        {adminLogin.isLoading && (
           <Loader />
        )} 
      </form>
    </div>
  );
};

export default AdminLogin;
