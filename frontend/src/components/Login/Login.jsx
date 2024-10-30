import React, { useState } from "react";
import styles from './login.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope , faL, faLock } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
const Login = () => {

  const [userid , setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [wrongHit, setWrongHit] = useState(0);
  const navigate = useNavigate();
  const {login} = useAuth();

  if(!!localStorage.getItem("id") || !!localStorage.getItem("token")){
    localStorage.removeItem("id");
    localStorage.removeItem("token");
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault(); 
      setWrongHit(wrongHit+1);
      const response = await axios.post("http://localhost:3000/login" , {userid : userid, password : password})
      // if(!response){
      //     console.log(response.error);
      //     return;
      // }
      const token = response.data.token;
      const id_user = response.data.id;
      localStorage.setItem("id" , id_user);
      // Added useAuth Hook 
      login(token);
      // localStorage.setItem('token', token);
      navigate("/todo");
      // console.log("Form submitted!");
      
    } catch (error) {
      if(wrongHit >= 4)
          alert("Don't have account ? Sign Up");
      else
        alert("Invalid Credentials!");
      console.log("Error while Loging In : " , error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.login_box}>
        <h2 className={styles.h2_auth}>Sign in </h2>
        <p className={styles.p_auth}>
          Welcome Again!
        </p>
        <form onSubmit={handleSubmit}>
            <div className={styles.input_box}>
            {/* <FontAwesomeIcon icon={faEnvelope} className={styles.icon" /> */}
                <input type="text" className={styles.email} value={userid} onChange={(e) => setUserId(e.target.value)} placeholder="Username" required />
            </div>
            <div className={styles.password}>
            {/* <FontAwesomeIcon icon={faLock} className={styles.icon" /> */}
                <input type="password" className={styles.password} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            </div>
            <p className={styles.switchToSignup}>Don't have a account ? <Link to="/signup">Sign Up</Link></p>
          <button type="submit">Get Started</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
