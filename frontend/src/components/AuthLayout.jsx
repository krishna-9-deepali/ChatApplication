import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);
  console.log(useSelector((state) => state.auth));
  const authUser = useSelector((state) => state.user.authUser);
  console.log(authUser);

  useEffect(() => {
    // if (authentication && authStatus !== authentication) {
    //   navigate("/login", { replace: true });
    //   // window.history.replaceState({}, "", "/login");
    // } else if (!authentication && authStatus !== authentication) {
    //   navigate("/", { replace: true });
    //   // window.history.replaceState({}, "", "/");
    // }
    if (authentication && authStatus) {
      navigate("/");
    } else {
      navigate("/login");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}
