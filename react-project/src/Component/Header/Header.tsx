import React from 'react';
import styles from '../Home/Home.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { logout } from '../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/`);
  };
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer} onClick={handleClick}>
        <img src={'/תמונות/logo.png'} alt="לוגו העסק" className={styles.logo}  />
        <span className={styles.brandName} >LUNARA</span>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li><a href="/">בית</a></li>
          <li><a href="/about">אודות</a></li>
          <li><a href="/services">שירותים</a></li>
          <li><a href="/contact">צור קשר</a></li>
           {user ? ( <li><a href="/personal">אזור אישי</a></li>) : ('' )}
          {!user ? (
            <>
              <li><a href="/login" className={styles.authLink}>כניסה</a></li>
              <li><a href="/signup" className={styles.authLink}>הרשמה</a></li>
            </>
          ) : (
            <li><a onClick={() => dispatch(logout())} className={styles.authLink}>התנתקות</a></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;