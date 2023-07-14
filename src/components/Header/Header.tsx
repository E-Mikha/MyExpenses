import { useStore } from "effector-react";
import { useTheme } from "../../hooks";
import { $username } from "../../context/auth";

export const Header = () => {
  const { switchTheme, theme } = useTheme();
  const username = useStore($username);

  return (
    <header
      className={`navbar navbar-dark bg-${
        theme === "dark" ? "dark" : "primary"
      }`}
    >
      <div className="container">
        <h1 style={{ color: "white" }}>Costs App</h1>
        {username.length ? <h2 style={{ color: "white" }}>{username}</h2> : ""}

        <button
          onClick={switchTheme}
          className={`btn btn-${theme === "dark" ? "dark" : "light"}`}
        >
          {theme === "dark" ? "Go light" : "Go dark"}
        </button>
      </div>
    </header>
  );
};
