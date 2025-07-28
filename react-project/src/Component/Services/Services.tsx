import React from 'react';
import styles from './Services.module.scss';
import Header from '../Header/Header';

const Services: React.FC = () => {
  return (
    <div>
      <Header></Header>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1>השירותים שלנו</h1>
          <p>אנו מציעים חוויית אירוח מושלמת עם שירותים יוקרתיים ואווירה מרגיעה</p>
        </div>

        <div className={styles.servicesGrid}>
          <div className={styles.card}>
            <h2>אירוח יוקרתי</h2>
            <p>חדרים מפוארים ומאובזרים בעיצוב מודרני עם נוף מרהיב ושירות חדרים אישי.</p>
          </div>

          <div className={styles.card}>
            <h2>מסעדת שף</h2>
            <p>תפריט גורמה עשיר, קפה איכותי וארוחות בוקר מפנקות מול נוף עוצר נשימה.</p>
          </div>

          <div className={styles.card}>
            <h2>ספא ובריכה</h2>
            <p>טיפולי גוף מקצועיים, סאונה, בריכה מחוממת ואזורי מנוחה מעוצבים.</p>
          </div>

          <div className={styles.card}>
            <h2>אירועים פרטיים</h2>
            <p>אולמות מרשימים לאירועים, כנסים ושבתות חתן – עם ליווי צמוד לכל אורך הדרך.</p>
          </div>

          <div className={styles.card}>
            <h2>שירותים נוספים</h2>
            <ul>
              <li>Wi-Fi חופשי</li>
              <li>חניה חינם</li>
              <li>שירותי כביסה</li>
              <li>דלפק קבלה 24/7</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
