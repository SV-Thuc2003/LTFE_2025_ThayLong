import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../../hooks/useAuth";
// import { useTranslation } from "react-i18next"; // Tạm ẩn i18n

// import { useAuth } from "../../../contexts/AuthContext";
import { useTranslation } from "react-i18next";


const OAuth2RedirectHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const username = params.get("username");
    // const role = params.get("role");
    const userId = params.get("userId");

    if (token && username && userId) {
      // login(parseInt(userId), username, token);
       login(username, token);
      navigate("/");
    } else {
      navigate("/login?error=missing_token");
    }
  }, [location, navigate, login]);

  return <div>{t("auth.oauth_processing")}</div>;
};

export default OAuth2RedirectHandler;
