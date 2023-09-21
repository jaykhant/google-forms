import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import { connect } from "react-redux";
import React, { useEffect } from "react";
import Dashboard from "../pages/Dashboard";
import ManageForm from '../pages/ManageForm';
import Header from "../components/Core/Header";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

function AppRouter({ isLoggedIn }) {
  const location = useLocation()
  const [containerHeight, setContainerHeight] = React.useState()
  useEffect(() => {
    setContainerHeight(window.innerHeight - 64)
  }, [])

  return (
    <div>
      {isLoggedIn ? <Header /> : ''}
      <Routes>
        <Route path="/sign-in" element={isLoggedIn ? <Navigate to="/" /> : <SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>

      {location.pathname !== "/sign-in" && location.pathname !== "/sign-up" ? <div style={{ height: `${containerHeight}px`, background: '#f0ebf8', overflow: 'auto' }}>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/sign-in" />}
          />
          <Route path="/form/:id" element={isLoggedIn ? <ManageForm /> : <Navigate to="/sign-in" />} />
        </Routes>
      </div> : ''}

    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.app.isLoggedIn,
  };
};
export default connect(mapStateToProps)(AppRouter);
