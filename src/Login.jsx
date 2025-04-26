import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import './Login.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const user = res.user;
      
      const docRef = doc(db, "teachers", user.email); // 🔥 use email instead of UID
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        onLogin({ uid: user.uid, email: user.email, ...data });
      } else {
        setError("User record not found");
      }
    } catch (err) {
      console.error(err);
      setError("Invalid credentials. Try again.");
    }
  };

  return (
    <div className="login-container">
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
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}

export default Login;
