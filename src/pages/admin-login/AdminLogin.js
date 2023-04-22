import { useContext } from "react";
import { AdminContext } from "./../../contexts/AdminContext";
import "./AdminLogin.scss";
import { auth } from "./../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import Loader from "./../../components/loader/Loader";

const AdminLogin = () => {
  const adminLogin = useContext(AdminContext);
  const signIn = async () => {
    try {
      adminLogin.setIsLoading(true);

      await signInWithEmailAndPassword(
        auth,
        adminLogin.email,
        adminLogin.password
      );
     // adminLogin.setIsLoading(false);

    } catch (error) {
        adminLogin.setError(error.message);
        adminLogin.setIsLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn();
  };
  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit} className="form">
        <h3> Admin Login </h3>
        <div className="input-wrapper">
          <label> Email: </label>
          <input
            type="email"
            value={adminLogin.email}
            onChange={(e) => adminLogin.setEmail(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <label> Password: </label>
          <input
            type="password"
            value={adminLogin.password}
            onChange={(e) => adminLogin.setPassword(e.target.value)}
          />
        </div>

        {!adminLogin.isLoading && (
        <button type="submit" className="submit-btn">
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
