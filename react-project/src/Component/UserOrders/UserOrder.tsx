import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

const UserOrder: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [orders, setOrders] = useState(user?.orders || []);

  useEffect(() => {
    setOrders(user?.orders || []);
  }, [user?.orders]);

  const isPastOrder = (checkOutDate?: string | Date) => {
    if (!checkOutDate) return false;
    const today = new Date();

    const outDate = typeof checkOutDate === 'string'
      ? new Date(checkOutDate)
      : checkOutDate;

    return outDate < today;
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>רשימת הזמנות</h2>
      {orders.length === 0 ? (
        <p style={styles.noOrders}>אין הזמנות להצגה</p>
      ) : (
        <ul style={styles.list}>
          {orders.map((order, index) => {

            const isPast = isPastOrder(order.checkOutDate);
            const listItemStyle = {
              ...styles.listItem,
              backgroundColor: isPast ? '#f0f0f0' : '#e0f7fa',
              borderRight: isPast ? '6px solid #ccc' : '6px solid #26c6da',
            };

            return (
              <li key={index} style={listItemStyle}>
                <div style={styles.rooms}>
                  <strong>חדרים:</strong>{' '}
                  {order.rooms && order.rooms.length > 0
                    ? order.rooms.map((room, i) => (
                      <span key={i}>{room.roomNumber ?? 'לא ידוע'} </span>
                    ))
                    : 'לא זמין'}
                </div>
                <div style={styles.dateRow}>
                  <span>
                    <strong>תאריך כניסה:</strong>{' '}
                    {order.checkInDate
                      ? new Date(order.checkInDate).toLocaleDateString('he-IL')
                      : 'לא זמין'}
                  </span>
                  <span>
                    <strong>תאריך יציאה:</strong>{' '}
                    {order.checkOutDate
                      ? new Date(order.checkOutDate).toLocaleDateString('he-IL')
                      : 'לא זמין'}
                  </span>
                </div>
                <div style={{ fontWeight: 'bold', color: isPast ? '#999' : '#00796b' }}>
                  {isPast ? 'ההזמנה הסתיימה' : 'הזמנה עתידית'}
                </div>
              </li>
            );
          })}
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
    direction: 'rtl' as const,
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
    borderRadius: 6,
    padding: 15,
    marginBottom: 15,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 10,
    transition: 'all 0.3s ease-in-out',
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
