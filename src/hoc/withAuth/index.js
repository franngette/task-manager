import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const withAuth = (WrappedComponent) => {
  const RequiresAuthentication = (props) => {
    const history = useHistory();
    
    const isUserAuthenticated = useSelector(state => state.auth.logged)

    useEffect(() => {
        if (!isUserAuthenticated) {
          history.push("/");
        }
    }, [isUserAuthenticated]);

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
