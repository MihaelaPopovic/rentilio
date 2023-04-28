import { useContext } from "react";
import { GuardProvider, GuardedRoute } from "react-router-guards";
import { AdminContext } from "./contexts/AdminContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./layouts/Navigation";
import Footer from "./layouts/Footer";
import AdminDashboard from "./pages/admin-dashboard/AdminDashboard";
import AdminLogin from "./pages/admin-login/AdminLogin";
import NotFound from "./pages/not-found/NotFound";
import Homepage from "./pages/homepage/Homepage";

function App() {
  const adminLogin = useContext(AdminContext);
  const requireLogin = (to, from, next) => {
    if (to.meta.auth) {
      if (adminLogin.getIsLoggedIn()) {
        next();
      }
      next.redirect("/admin-login");
    } else {
      next();
    }
  };

  return (
    <div>
      <Router>
        <Navigation />
        <GuardProvider guards={[requireLogin]}>
          <Switch>
            <Route exact path="/">
              <Homepage />
        <Footer />

            </Route>
            <GuardedRoute
              path="/dashboard"
              exact
              component={AdminDashboard}
              meta={{
                auth: true,
              }}
            />
            <Route exact path="/admin-login" component={AdminLogin} />
            <Route exact path="*">
              <NotFound />
            </Route>
          </Switch>
        </GuardProvider>

      </Router>
    </div>
  );
}

export default App;
