import { useSelector } from "react-redux";
import Dashboard from "../pages/Dashboard";
import SignIn from "../pages/SignIn"
import SignUp from "../pages/SignUp"
import { Navigate, Route, Routes } from "react-router-dom";

function AppRouter(){
  const isLoggedIn = useSelector((state) => state.app.isLoggedIn)
  
  return (
    <Routes>
      <Route path="/sign-in" element={isLoggedIn ? <Navigate to="/" /> : <SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route
        path="/"
        element={isLoggedIn ? <Dashboard /> : <Navigate to="/sign-in" />}
      >
        <Route path="new" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
