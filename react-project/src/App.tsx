import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import LoginForm from './Component/LogInForm/LogInForm'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import SignUpForm from './Component/SignUpForm/SignUpForm';
import RoomList from './Component/RoomList/RoomList';
import Home from './Component/Home/Home';
import About from './Component/About/About';
import Services from './Component/Services/Services';
import ContactForm from './Component/ContactForm/ContactForm';
import Personal from './Component/Personal/Personal';
import CreditCardPayment from './Component/CreditCardPayment/CreditCardPayment';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import HotelPage from './Component/Hotels/HotelPage/HotelPage';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = '318066376948-l2satljm6u72d1v3duj9c8fo81immhll.apps.googleusercontent.com';

const stripePromise = loadStripe('pk_test_12345YOURKEY');

const CreditCardPaymentFromLocation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { roomId, userId, checkInDate, checkOutDate, amount } = location.state || {};

  useEffect(() => {
    console.log('CreditCardPaymentFromLocation mounted with state:', location.state);
    console.log('roomId:', roomId, 'userId:', userId, 'checkInDate:', checkInDate, 'checkOutDate:', checkOutDate, 'amount:', amount);
    if (!roomId || !userId || !checkInDate || !checkOutDate || !amount) {
      navigate('/');
    }
  }, [roomId, userId, checkInDate, checkOutDate, amount, navigate]);
  return (
    <Elements stripe={stripePromise}>
      <CreditCardPayment />
    </Elements>
  );
};

function App() {
  return (

    <div className="App">
      <GoogleOAuthProvider clientId={clientId}>
        <ToastContainer autoClose={1500}/>
        <BrowserRouter>
          <div className="App">
            <Routes>
              {/* עמוד התחברות */}
              <Route path="/login" element={<LoginForm />} />
              {/* עמוד הרשמה */}
              <Route path="/signup" element={<SignUpForm />} />
              {/* הצגת דף בית*/}
              <Route path="/" element={<Home />} />
              
              <Route path="/hotel/:hotelId" element={<HotelPage />} />
              {/* דף אודות*/}
              <Route path="/about" element={<About />} />
              {/* דף שירותים*/}
              <Route path="/services" element={<Services />} />
              {/* דף יצירת קשר*/}
              <Route path="/contact" element={<ContactForm />} />
              {/* דף אישי */}
              <Route path="/personal" element={<Personal />} />
              {/* דף תשלום */}
              <Route path="/payment" element={<CreditCardPaymentFromLocation />} />
            </Routes>
          </div>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
