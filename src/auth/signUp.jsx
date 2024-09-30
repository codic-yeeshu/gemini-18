import React, { useContext, useState } from "react";
import styles from "./signUp.module.css";
import { Context } from "../context/context";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../config/firebaseConfig";

const SignUpPage = () => {
  const { setNewUser } = useContext(Context);
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, signUpData.email, signUpData.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User created:", user);

        setNewUser(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error signing up:", error);
        // Display error message to the user
        alert(errorMessage);
      });
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.heading}>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputField}>
          <label htmlFor="name">Name:</label>
          <input
            onChange={(e) => {
              setSignUpData({
                name: e.target.value,
                email: signUpData.email,
                password: signUpData.password,
              });
            }}
            type="text"
            id="name"
            className={styles.input}
          />
        </div>
        <div className={styles.inputField}>
          <label htmlFor="email">Email:</label>
          <input
            onChange={(e) => {
              setSignUpData({
                name: signUpData.name,
                email: e.target.value,
                password: signUpData.password,
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
              setSignUpData({
                name: signUpData.name,
                email: signUpData.email,
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
            Signup
          </button>
        </div>
         
        <div className={styles.signInNote}>
          Already have an Account?
          <a
            onClick={() => setNewUser((prev) => !prev)}
            className={styles.anchor}
          >
            SignIn here
          </a>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
