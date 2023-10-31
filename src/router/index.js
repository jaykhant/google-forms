import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import { connect } from "react-redux";
import React, { useEffect } from "react";
import Dashboard from "../pages/Dashboard";
import ManageForm from '../pages/ManageForm';
import Header from "../components/Core/Header";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import ResponseView from "../pages/ResponseView";
import ResponseSubmit from "../pages/ResponseSubmit";

function AppRouter({ isLoggedIn }) {
  const location = useLocation()
  const [containerHeight, setContainerHeight] = React.useState()
  const [loadMore, setLoadMore] = React.useState(false)

  useEffect(() => {
    setContainerHeight(window.innerHeight)
  }, [])

  const onScroll = (event) => {
    let el = event.target;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight) {
      setLoadMore(!loadMore);
    }
  }

  return (
    <div
      style={
        location.pathname !== "/sign-in" && location.pathname !== "/sign-up" ?
          { height: `${containerHeight}px`, background: '#f0ebf8', overflow: 'auto' }
          : {}
      }
      onScroll={onScroll}
    >
      {isLoggedIn ? <Header /> : ''}
      <Routes>
        <Route path="/sign-in" element={isLoggedIn ? <Navigate to="/" /> : <SignIn />} />
        <Route path="/sign-up" element={isLoggedIn ? <Navigate to="/" /> : <SignUp />} />

        <Route path="/" element={isLoggedIn ? <Dashboard loadMore={loadMore} /> : <Navigate to="/sign-in" />} />
        <Route path="/form/:formId" element={isLoggedIn ? <ManageForm loadMore={loadMore} /> : <Navigate to="/sign-in" />} />

        <Route path="/response/submit/:formId" element={isLoggedIn ? <ResponseSubmit /> : <Navigate to="/sign-in" />} />
        <Route path="/response/:responseId" element={isLoggedIn ? <ResponseView /> : <Navigate to="/sign-in" />} />
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
