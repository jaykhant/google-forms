import { connect } from "react-redux";
import Dashboard from "../pages/Dashboard";
import SignIn from "../pages/SignIn"
import SignUp from "../pages/SignUp"
import ManageForm from '../pages/ManageForm';
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "../components/Core/Header";

function AppRouter ({ isLoggedIn }) {

  return (
    <div>
      {isLoggedIn ? <Header /> : ''}
      <Routes>
        <Route path="/sign-in" element={isLoggedIn ? <Navigate to="/" /> : <SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/sign-in" />}
        />
        <Route path="/form/:id" element={<ManageForm />} />
      </Routes>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.app.isLoggedIn,
  };
};
export default connect(mapStateToProps)(AppRouter);
