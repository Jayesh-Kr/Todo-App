import React from 'react'
import pandaImage from '../../assets/panda.png';
import styles from './landingpage.module.css';
import NavBar from '../NavBar/NavBar';
import { Link } from 'react-router-dom';
const LandingPage = () => {
  return (
    <>
    <header>
        <div className={styles.header_container}>
            <NavBar/>
            <div className={styles.header_landing}>
                <p>Stay focused and stick to the </p> <p>plan with cute monsters</p>
                <Link to="/signup" ><div className={styles.get_started}>Get Started</div></Link>
                <img src={pandaImage} alt="Panda Img" />
            </div>
        </div>
    </header>
    </>
  )
}

export default LandingPage