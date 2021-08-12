import { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { signIn, signOut } from "../actions";

const GoogleAuth = () => {
  const auth = useRef("");
  const dispatch = useDispatch();
  const { isSignedIn, name } = useSelector((state) => state.auth);

  const onAuthChange = useCallback(
    (isSignedIn) => {
      const user = auth.current.currentUser.get().getBasicProfile();
      if (isSignedIn) {
        dispatch(signIn(user.getId(), user.getGivenName()));
      } else {
        dispatch(signOut());
      }
    },
    [dispatch]
  );

  useEffect(() => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: "168272385105-spito4el4i4fk96b3jit9df21n4ord0m.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          auth.current = window.gapi.auth2.getAuthInstance();
          onAuthChange(auth.current.isSignedIn.get());
          auth.current.isSignedIn.listen(onAuthChange);
        });
    });
  }, [onAuthChange]);

  const onSignInClick = () => {
    auth.current.signIn({ prompt: "select_account" });
  };

  const onSignOutClick = () => {
    auth.current.signOut();
  };

  const renderAuthButton = () => {
    if (isSignedIn === null) {
      return null;
    } else if (isSignedIn) {
      return (
        <>
          <span>Hi, {name}! </span>
          <button className="ui red google button" onClick={onSignOutClick}>
            <i className="google icon" />
            Sign Out
          </button>
        </>
      );
    } else {
      return (
        <button className="ui green google button" onClick={onSignInClick}>
          <i className="google icon" />
          Sign In
        </button>
      );
    }
  };

  return <div>{renderAuthButton()}</div>;
};

export default GoogleAuth;
