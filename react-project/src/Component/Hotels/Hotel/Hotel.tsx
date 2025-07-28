import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Hotel.module.scss'; // Assuming you have a CSS module for styling
import { useNavigate } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';

export interface IHotel {
  hotelName: string;
  hotelAddress: string;
  hotelCity: string;
  hotelPhone: string;
  hotelEmail: string;
  rooms: any[];
  imagesUrl: string[] | null;
  id: number;
}

interface HotelDetailsProps {
  hotelId: number;
}

const Hotel: React.FC<HotelDetailsProps> = ({ hotelId }) => {
const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/hotel/${hotelId}`);
  };
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); 

    return () => clearTimeout(timer); 
  }, []);
  const [hotel, setHotel] = useState<IHotel | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/hotels/getHotelById`, {
        params: { hotelId: hotelId },
      })
      .then((response) => {
        const selectedHotel = response.data;
        setHotel(selectedHotel || null);
      })
      .catch((err) => {
        setError('אירעה שגיאה בעת שליפת נתוני המלון');
        console.error(err);
      });
  }, [hotelId]);

  if (error) return <div className={styles.error}>{error}</div>;
  if (!hotel) return <div className={styles.loading}>טוען נתונים...</div>;

  return (
    <div className={styles.hotelContainer} onClick={handleClick}>
            {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px'  }}>
          <PropagateLoader color="#074282" size={10} />
        </div>
      ) : (
''      )}
        <img
          src={`/תמונות/image_hotel${hotel.id}.jpg`}
          alt={`תמונה של ${hotel.hotelName}`}
          className={styles.hotelImage}
        />
      <h2 className={styles.hotelTitle}>{hotel.hotelName}</h2>
      <p className={styles.hotelInfo}>
        <strong>כתובת:</strong> {hotel.hotelAddress}
      </p>
      <p className={styles.hotelInfo}>
        <strong>עיר:</strong> {hotel.hotelCity}
      </p>
      <p className={styles.hotelInfo}>
        <strong>טלפון:</strong> {hotel.hotelPhone}
      </p>
      <p className={styles.hotelInfo}>
        <strong>אימייל:</strong> {hotel.hotelEmail}
      </p>
    </div>
  );
};

export default Hotel;
