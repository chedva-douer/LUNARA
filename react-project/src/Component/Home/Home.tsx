 import React from 'react'
import Hotel from '../Hotels/Hotel/Hotel';
import styles from './Home.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { logout } from '../../features/user/userSlice';
import Header from '../Header/Header';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  return(
  <div>
<Header></Header>
  <div className={styles.container}>
    <Hotel hotelId={1} />
    <Hotel hotelId={2} />
    <Hotel hotelId={3} />
  </div></div>)
};

export default Home;
