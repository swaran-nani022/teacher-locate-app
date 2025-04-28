import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import "./Login.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const user = res.user;

      const docRef = doc(db, "teachers", user.email); // Use email instead of UID
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        onLogin({ uid: user.uid, email: user.email, ...data });
      } else {
        setError("User record not found. Please ensure you have registered as a teacher.");
      }
    } catch (err) {
      console.error(err);
      setError("Invalid credentials. Please check your email and password.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h1>Teacher Location Sharing</h1>
        <p>
          Welcome to the Teacher Location Sharing platform. This system allows
          teachers to share their locations with students, making it easier for
          students to find them. Please log in to continue.
        </p>
      </div>
      <div className="login-box">
        <h2>Login to LocateMyProf</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default Login;
