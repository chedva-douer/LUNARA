import React from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import Header from '../Header/Header';
import EditUserInformation from '../EditUserInformation/EditUserInformation';
import UserOrder from '../UserOrders/UserOrder';
import './Personal.scss'; 

const Personal: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <div>
      <Header />
      <h1>אזור אישי</h1>
      <p>שלום ל-{user?.userName}</p>
      <p>ברוכים הבאים לאזור האישי שלכם. כאן תוכלו לנהל את ההזמנות שלכם, לעדכן פרטים אישיים ולצפות בהסטורית ההזמנות שלכם</p>
      <div className="personal-section">
        <EditUserInformation />
        <UserOrder />
      </div>
    </div>
  );
}

export default Personal;
