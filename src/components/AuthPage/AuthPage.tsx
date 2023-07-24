import { MutableRefObject, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthClient } from "../../api/authClient";
import { Spinner } from "../Spinner/Spinner";
import { handleAlertMessage } from "../../utils/auth";
import "./style.css";

export const AuthPage = ({ type }: { type: "login" | "registration" }) => {
  const [spinner, setSpinner] = useState(false);
  const usernameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;
  const navigate = useNavigate();
  const currentAuthTitle = type === "login" ? "Log In" : "Registration";

  const handleAuthResponse = (
    result: boolean | undefined,
    navigatePath: string,
    alertText: string
  ) => {
    if (!result) {
      setSpinner(false);
      return;
    }

    setSpinner(false);
    navigate(navigatePath);
    handleAlertMessage({ alertText, alertStatus: "success" });
  };

  const handleLogin = async (username: string, password: string) => {
    if (!username || !password) {
      setSpinner(false);
      handleAlertMessage({
        alertText: "Fill in all the fields",
        alertStatus: "warning",
      });
      return;
    }

    const result = await AuthClient.login(username, password);

    handleAuthResponse(result, "/costs", "Sign in");
  };

  const handleRegistration = async (username: string, password: string) => {
    if (!username || !password) {
      setSpinner(false);
      handleAlertMessage({
        alertText: "Fill in all the fields",
        alertStatus: "warning",
      });
      return;
    }

    if (password.length < 4) {
      setSpinner(false);
      handleAlertMessage({
        alertText: "Password must be more than 4 characters",
        alertStatus: "warning",
      });
      return;
    }

    const result = await AuthClient.registration(username, password);

    handleAuthResponse(result, "/login", "Registration completed");
  };

  const handleAuth = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSpinner(true);

    switch (type) {
      case "login":
        handleLogin(usernameRef.current.value, passwordRef.current.value);
        break;
      case "registration":
        handleRegistration(
          usernameRef.current.value,
          passwordRef.current.value
        );
        break;
      default:
        break;
    }
  };

  return (
    <div className="container">
      <h1>{currentAuthTitle}</h1>
      <form onSubmit={handleAuth} className="form-group">
        <label className="auth_label">
          Enter username
          <input ref={usernameRef} type="text" className="form-control" />
        </label>

        <label className="auth_label">
          Enter password
          <input ref={passwordRef} type="password" className="form-control" />
        </label>

        <button className="btn btn-primary auth-btn">
          {spinner ? <Spinner top={5} left={20} /> : currentAuthTitle}
        </button>
      </form>
      {type === "login" ? (
        <div>
          <span className="question_text">Don't have an account yet?</span>
          <Link to={"/registration"}>Sign up</Link>
        </div>
      ) : (
        <div>
          <span className="question_text">Do you have an account?</span>
          <Link to={"/login"}>Sign in</Link>
        </div>
      )}
    </div>
  );
};
