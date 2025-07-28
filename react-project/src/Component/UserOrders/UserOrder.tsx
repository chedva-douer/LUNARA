import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

const UserOrder: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [orders, setOrders] = useState(user?.orders || []);

  useEffect(() => {
    console.log(user)
    console.log(user?.orders)
    user?.orders?.forEach((o, i) => {
      console.log(`Order ${i}:`, o);
    });
    setOrders(user?.orders || []);
  }, [user?.orders]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>רשימת הזמנות</h2>
      {orders.length === 0 ? (
        <p style={styles.noOrders}>אין הזמנות להצגה</p>
      ) : (
        <ul style={styles.list}>
          {orders.map((order, index) => (
            <li key={index} style={styles.listItem}>
              <div style={styles.rooms}>
                <strong>חדרים:</strong>
                {order.rooms && order.rooms.length > 0
                  ? order.rooms.map((room, i) => (
                    <span key={i}>{room.roomNumber ?? 'לא ידוע'}</span>
                  ))
                  : 'לא זמין'}             </div>
              <div style={styles.dateRow}>
                <span><strong>תאריך כניסה:</strong> {order.checkInDate ? new Date(order.checkInDate).toLocaleDateString('he-IL') : 'לא זמין'}</span>
                <span><strong>תאריך יציאה:</strong> {order.checkOutDate ? new Date(order.checkOutDate).toLocaleDateString('he-IL') : 'לא זמין'}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 600,
    margin: '20px auto',
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
    direction: 'rtl' as const, // חשוב בשביל עברית
  },
  title: {
    textAlign: 'center' as const,
    marginBottom: 20,
    color: '#333',
  },
  noOrders: {
    textAlign: 'center' as const,
    color: '#666',
    fontStyle: 'italic',
  },
  list: {
    listStyleType: 'none' as const,
    padding: 0,
    margin: 0,
  },
  listItem: {
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 15,
    marginBottom: 15,
    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 10,
  },
  rooms: {
    fontSize: 16,
    color: '#007bff',
  },
  dateRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 14,
    color: '#555',
  },
};

export default UserOrder;
