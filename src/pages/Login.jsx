import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useAuth } from "../contexts/UserAuth";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import Button from "../components/Button";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const { loggingAccount, isLogged, isInvalid } = useAuth();
  const navigate = useNavigate();

  function handleLogin(e) {
    if (email && password) {
      e.preventDefault();
      loggingAccount(email, password);
    }
  }

  useEffect(() => {
    if (isLogged) {
      navigate("/app", { replace: true }); // Here when we are trying to go back, it will redirect to the login page. In that page the state "isLogged" is true. So it will immediately return to the app layout page. Therefore by using "replace" we can go back to the homepage (the page which was before the login page) from the app layout page.
    } else if (isInvalid) {
      alert("Invalid Login");
    }
  }, [isLogged, isInvalid, navigate]);

  return (
    <main className={styles.login}>
      <NavBar />
      <form className={styles.form} onSubmit={(e) => handleLogin(e)}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
