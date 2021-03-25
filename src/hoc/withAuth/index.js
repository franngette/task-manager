import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import {connectSocket} from "../../webSocket/webSocket"

const withAuth = (WrappedComponent) => {
  const RequiresAuthentication = (props) => {
    const history = useHistory();

    const isUserAuthenticated = useSelector((state) => state.auth.logged);
    const isSocketConnected = useSelector(
      (state) => state.auth.isSocketConnected
    );
    const user = JSON.parse(sessionStorage.getItem("user"));

    useEffect(() => {
      if (!isUserAuthenticated) {
        history.push("/");
      } else {
        if (!isSocketConnected) {
          connectSocket(user.id)
        }
      }
    }, [history, isSocketConnected, isUserAuthenticated, user.id ]);

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
