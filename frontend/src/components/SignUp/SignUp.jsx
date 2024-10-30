import React, { useState } from "react";
import styles from './signup.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope , faL, faLock } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
const SignUp = () => {

  const [name , setName] = useState("");
  const [userid , setUserId] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const navigate = useNavigate();

  if(!!localStorage.getItem("id") || !!localStorage.getItem("token")){
    localStorage.removeItem("id");
    localStorage.removeItem("token");
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault(); 
     const response =  await axios.post("http://localhost:3000/signup" , {name : name, userid : userid, email : email, password : password});
    //  console.log(response.data);
      navigate('/login');
      // console.log("Form submitted!");      
    } catch (error) {
      alert(error.response.data.error.map((e) =>`${e.message}\n`));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.login_box}>
        <h2 className={styles.h2_auth}>Sign Up</h2>
        <p className={styles.p_auth}>
          Welcome to Todo-App - Let's create your account
        </p>
        <form onSubmit={handleSubmit}>
            {/* <FontAwesomeIcon icon={faEnvelope} className={styles.icon" /> */}
                <input type="text" className={styles.email} value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
                <input type="text" className={styles.email} value={userid} onChange={(e) => setUserId(e.target.value)} placeholder="Username" required />
                <input type="email" className={styles.email} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            
            {/* <FontAwesomeIcon icon={faLock} className={styles.icon" /> */}
                <input type="password" className={styles.password} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
              <p className={styles.switchToLogin}>Already have an account ! <Link to="/login">Sign In</Link></p>
          <button type="submit">Get Started</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
