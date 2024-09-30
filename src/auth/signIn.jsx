import React, { useContext, useState } from "react";
import styles from "./signIn.module.css";
import { Context } from "../context/context";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../config/firebaseConfig";

const SignInPage = () => {
  const { setNewUser, setLoggedIn } = useContext(Context);
  const [signInData, setSignInData] = useState({ email: "", password: "" });

  const handleSignIn = (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, signInData.email, signInData.password)
      .then((userCredential) => {
        // console.log("2");
        const user = userCredential.user;
        console.log(user);
        // console.log("3");
        setLoggedIn(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.heading}>SignIn</h2>
      <form onSubmit={handleSignIn}>
        <div className={styles.inputField}>
          <label htmlFor="email">Email:</label>
          <input
            onChange={(e) => {
              setSignInData({
                email: e.target.value,
                password: signInData.password,
              });
            }}
            type="email"
            id="email"
            className={styles.input}
          />
        </div>
        <div className={styles.inputField}>
          <label htmlFor="password">Password:</label>
          <input
            onChange={(e) => {
              setSignInData({
                email: signInData.email,
                password: e.target.value,
              });
            }}
            type="password"
            id="password"
            className={styles.input}
          />
        </div>
        <div className={styles.btndiv}>
          <button type="submit" className={styles.button}>
            SignIn
          </button>
        </div>
         
        <div className={styles.signInNote}>
          New User?{" "}
          <a
            onClick={() => setNewUser((prev) => !prev)}
            className={styles.anchor}
          >
            SignUp here
          </a>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
