import React, { useContext } from "react";
import SideBar from "./components/sidebar/sidebar";
import Main from "./components/main/main";
import SignInPage from "./auth/signIn.jsx";
import SignUpPage from "./auth/signUp.jsx";
import { Context } from "./context/context.jsx";

const App = () => {
  const { isLoggedIn, setLoggedIn, isNewUser, setNewUser } =
    useContext(Context);
  return (
    <>
      {isLoggedIn ? (
        <>
          <SideBar />
          <Main />
        </>
      ) : isNewUser ? (
        <SignUpPage />
      ) : (
        <SignInPage />
      )}
    </>
  );
};

export default App;
