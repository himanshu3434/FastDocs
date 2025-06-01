import { useEffect, useState } from "react";
import type { ReactElement } from "react";

import { useNavigate } from "react-router-dom";

type authType = {
  children?: ReactElement;
  userStatus: boolean;
  authentication: boolean;
  isAdmin: boolean;
  adminOnly: boolean;
};
function AuthLayout({
  children,
  authentication = true,
  userStatus = false,
  isAdmin = false,
  adminOnly = false,
}: authType) {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  console.log("here ");
  useEffect(() => {
    if (authentication && userStatus !== authentication) navigate("/login");
    else if (authentication === false && userStatus !== authentication) {
      navigate("/");
    }

    if (adminOnly == true && isAdmin === false) navigate("/");
    setLoading(false);
  }, [authentication, userStatus, isAdmin, adminOnly]);

  return loading ? <div>Loading </div> : <div> {children}</div>;
}

export default AuthLayout;
