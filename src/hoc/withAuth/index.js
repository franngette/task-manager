import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions/auth";

const withAuth = (WrappedComponent) => {
  const RequiresAuthentication = (props) => {
    const history = useHistory();

    let isUserAuthenticated = useSelector((state) => state.auth.logged);
    let isSocketConnected = useSelector(
      (state) => state.auth.isSocketConnected
    );
    isUserAuthenticated = isUserAuthenticated ? true : false;
    isSocketConnected = isSocketConnected ? true : false;
    const user = JSON.parse(sessionStorage.getItem("user"));
    const dispatch = useDispatch();

    useEffect(() => {
      if (!isUserAuthenticated) {
        history.push("/");
      } else {
        if (!isSocketConnected) {
          dispatch(actions.connectSocket(user.id));
        }
      }
    }, [isUserAuthenticated, isSocketConnected]);

    // if there's a loggedInUser, show the wrapped page, otherwise show a loading indicator
    //return role && role !== "guest" ? <WrappedComponent {...props} /> : <div>Loading...</div>;
    return <WrappedComponent {...props} />;
  };

  return RequiresAuthentication;
};

withAuth.propTypes = {
  WrappedComponent: PropTypes.node.isRequired,
};

export default withAuth;
