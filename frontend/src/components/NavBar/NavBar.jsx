import React from "react";
import styles from '../LandingPage/landingpage.module.css';
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
const NavBar = () => {
  const {logout , isAuthenticated} = useAuth();
  const navigate = useNavigate();
  // const isLoggedIn = localStorage.getItem("token");
  const handleLogout = () =>{
    // localStorage.removeItem("token");
    // Added useAuth Hook
    logout();
    navigate("/");
  }
  return (
    <nav>
      <p>Todo-App</p>
      <div className={styles.auth_section}>
         {isAuthenticated ? (
        <Link to="/"> <div className={styles.login} onClick={handleLogout}>Logout</div></Link>
         )
        :(
          <>
        <Link to="/signup"> <div className={styles.signUp}>Sign Up</div></Link>
        <Link to="/login"><div className={styles.login} >Login</div></Link>
        </>
        )
         }
      </div>
    </nav>
  );
};

export default NavBar;
