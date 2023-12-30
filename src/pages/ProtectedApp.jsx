import { useEffect } from "react";
import { useAuth } from "../contexts/UserAuth";
import { useNavigate } from "react-router-dom";

function ProtectedApp({ children }) {
  const { isLogged } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      navigate("/");
    }
  }, [isLogged, navigate]);

  return isLogged ? children : null;
}

export default ProtectedApp;
