import React, { useState, useEffect, useRef } from 'react';
import './HotelPage.scss';
import OrderForm from '../../OrderForm/OrderForm';
import axios from 'axios';
import { IHotel } from '../Hotel/Hotel';
import Header from '../../Header/Header';
import RoomList from '../../RoomList/RoomList';
import { Room } from '../../../Models/Room.model';
import { useParams } from 'react-router-dom';

const TOTAL_IMAGES = 65;
const IMAGES_PER_LOAD = 10;


const generateImages = (start: number, count: number) => {
  const end = Math.min(start + count - 1, TOTAL_IMAGES);
  return Array.from({ length: end - start + 1 }, (_, idx) => ({
    id: start + idx,
    url: `/תמונות/image${start + idx}.jpg`,
  }));
};

const HotelPage: React.FC = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const [roomsFromSearch, setRoomsFromSearch] = useState<Room[]>([]);
  const [images, setImages] = useState(() => generateImages(1, 20));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [hotelData, setHotelData] = useState<IHotel | null>(null);
  const [selectedDates, setSelectedDates] = useState<{ startDate: Date | null, endDate: Date | null }>({
    startDate: null,
    endDate: null,
  });
  // קריאת הנתונים של המלון מהשרת
  useEffect(() => {
    axios.get(`http://localhost:8080/hotels/getHotelById`, {
      params: {
        hotelId: hotelId,
      },
    })
      .then((response) => {
        const hotelData = response.data;
        setHotelData(hotelData);
      })
      .catch((err) => {
        console.error('שגיאה בטעינת נתוני המלון:', err);
      });
  }, [hotelId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.min(images.length, 5));
    }, 4000);
    return () => clearInterval(timer);
  }, [images]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !isLoadingMore && hasMore) {
          setIsLoadingMore(true);
          setTimeout(() => {
            setImages((prev) => {
              const newImages = generateImages(prev.length + 1, IMAGES_PER_LOAD);
              const updatedImages = [...prev, ...newImages];
              if (updatedImages.length >= TOTAL_IMAGES) {
                setHasMore(false);
              }
              return updatedImages;
            });
            setIsLoadingMore(false);
          }, 500);
        }
      },
      { threshold: 1.0 }
    );

    const loader = loaderRef.current;
    if (loader) observer.observe(loader);
    return () => {
      if (loader) observer.unobserve(loader);
    };
  }, [isLoadingMore, hasMore]);

  return (
    <div className="hotel-page">
      <Header />

      {roomsFromSearch.length > 0 ? (
        <RoomList roomsList={roomsFromSearch} checkInDate={selectedDates.startDate} checkOutDate={selectedDates.endDate}/>
      ) : (
        <>
          <header>
            <nav className="hotel-nav">
              <ul>
                <li><a href="#booking">הזמנה</a></li>
                <li><a href="#gallery">גלריה</a></li>
                <li><a href="#map">מיקום</a></li>
                <li><a href="#rooms">כל החדרים</a></li>
              </ul>
            </nav>
          </header>

          <header className="hotel-header">
            <h1>{hotelData?.hotelName || 'מלון'}</h1>
            <p className="hotel-subtitle">
              {hotelData?.hotelAddress || 'חוויה בלתי נשכחת בלב העיר'}
            </p>
          </header>

          <section className="hotel-slider">
            <img
              key={images[currentIndex]?.id}
              src={images[currentIndex]?.url}
              alt={`תמונה ${currentIndex + 1}`}
              className="slider-image"
            />
            <div className="dots">
              {images.slice(0, 5).map((_, idx) => (
                <span
                  key={idx}
                  className={`dot ${currentIndex === idx ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`בחר תמונה ${idx + 1}`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setCurrentIndex(idx)}
                />
              ))}
            </div>
          </section>

          <section id="booking" className="hotel-info">
            <div className="hotel-description">
              <h2>על המלון</h2>
              <p>{hotelData?.hotelEmail || 'מלון בוטיק יוקרתי בלב העיר...'}</p>
              <p>
                {hotelData?.hotelPhone ||
                  'מתקנים כוללים: ספא, בריכה מקורה, מסעדה גורמה וחדר כושר חדיש.'}
              </p>
            </div>
          </section>

          <section id="gallery" className="image-gallery">
            <h2>גלריית תמונות</h2>
            <div className="image-grid">
              {images.map((img) => (
                <img key={img.id} src={img.url} alt={`תמונה ${img.id}`} />
              ))}
            </div>
            {hasMore && (
              <div ref={loaderRef} className="loading">
                טוען עוד...
              </div>
            )}
          </section>

          <section id="map" className="hotel-map">
            <h2>מיקום המלון</h2>
            <iframe
              title="מיקום המלון"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                hotelData?.hotelAddress || ''
              )}&output=embed`}
              width="100%"
              height="200"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </section>

          <section id="rooms" className="hotel-info">
            <div className="room-list-container">
              <RoomList hotelId={hotelId ? Number(hotelId) : undefined} />
            </div>
          </section>
        </>
      )}

      <div className="hotel-booking">
        <OrderForm 
          onRoomsFound={setRoomsFromSearch}
          selectedDates={selectedDates}
          setSelectedDates={setSelectedDates} />
      </div>
    </div>

  );
};

export default HotelPage;
