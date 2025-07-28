import React, { useState } from 'react';
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './CreditCardPayment.scss';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/hooks';
import { addOrder, Order } from '../../features/user/userSlice';

interface CreditCardPaymentProps { }

const CreditCardPayment: React.FC<CreditCardPaymentProps> = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { roomId, userId, checkInDate, checkOutDate, amount } = location.state || {};

  const stripe = useStripe();
  const elements = useElements();

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  if (!roomId || !userId || !checkInDate || !checkOutDate || !amount) {
    navigate('/');
    return null;
  }

  const validationSchema = yup.object().shape({
    idNumber: yup
      .string()
      .required('חובה להזין ת"ז')
      .matches(/^\d{5,10}$/, 'ת"ז לא תקינה'),
    installments: yup
      .number()
      .required('חובה לבחור מספר תשלומים')
      .oneOf([1, 2, 3, 6, 12], 'מספר תשלומים לא תקף'),
  });
  console.log('createOrder called', { roomId, userId, checkInDate, checkOutDate });

  const createOrder = async () => {
    try {
      const response = await fetch('http://localhost:8080/orders/addOrder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId,
          userId,
          checkInDate: new Date(checkInDate).toISOString().split('T')[0], 
          checkOutDate: new Date(checkOutDate).toISOString().split('T')[0],
        }),
      });
      if (!response.ok) {
        throw new Error('בעיה ביצירת ההזמנה');
      }
      else {
      const newOrder = await response.json();
      //  const order: Order = {
      //   roomId: newOrder.room.roomId,
      //   userId: newOrder.userId,
      //   checkInDate: new Date(newOrder.checkInDate),
      //   checkOutDate: new Date(newOrder.checkOutDate),
      // };
      dispatch(addOrder(newOrder));
      console.log("הזמנה שחזרה מהשרת ונשלחה לרידאקס", newOrder);
      console.log("הזמנה שנשלפה מרידקאס", user?.orders);
      toast.success('ההזמנה נוצרה בהצלחה!');
      setPaymentSuccess(true);
      await fetch('http://localhost:8080/mail/sendOK', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipientEmail: user?.userEmail,
messageText: `שלום ${user?.userName || ''},\n\nההזמנה שלך אושרה בהצלחה!\n\nפרטי הזמנה:\nחדר: ${roomId}\nתאריך כניסה: ${new Date(checkInDate).toLocaleDateString('he-IL')}\nתאריך יציאה: ${new Date(checkOutDate).toLocaleDateString('he-IL')}\nסכום: ₪${amount.toFixed(2)}\n\nתודה שבחרת בנו.`,      }),
    });

}
    } catch (err: any) {
      toast.error(err.message || 'שגיאה ביצירת ההזמנה');
    }
  };

  const handleSubmit = async (
    values: { idNumber: string; installments: number },
    { resetForm }: any
  ) => {
    setLoading(true);
    setErrorMsg('');

    try {
      if (!stripe || !elements) {
        setErrorMsg('Stripe לא זמין כרגע');
        return;
      }

      // כאן תשלבי תשלום אמיתי עם Stripe בעתיד
      await new Promise(res => setTimeout(res, 1000)); // הדמיה

      setPaymentSuccess(true);
      resetForm();

      await createOrder();


    } catch (error: any) {
      setErrorMsg(error.message || 'שגיאה בתשלום');
    } finally {
      setLoading(false);
    }
  };
  const close = () => {
    setPaymentSuccess(false)
    navigate('/')
  };
  const cardStyle = {
    style: {
      base: {
        fontSize: '16px',
        color: '#32325d',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
      },
    },
  };

  return (
    <div className="payment-container">
      <h3>תשלום בכרטיס אשראי</h3>
      <p>סכום לתשלום: ₪{amount.toFixed(2)}</p>

      {!paymentSuccess && (
        <Formik
          initialValues={{ idNumber: '', installments: 1 }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="payment-form">
              <div className="card-box">
                <CardElement options={cardStyle} />
              </div>

              <Field
                name="idNumber"
                placeholder="תעודת זהות"
                className="input-field"
              />
              <ErrorMessage name="idNumber">
                {(msg) => <div className="error-message">{msg}</div>}
              </ErrorMessage>

              <Field as="select" name="installments" className="input-field">
                {[1, 2, 3, 6, 12].map((n) => (
                  <option key={n} value={n}>
                    {n} תשלומים
                  </option>
                ))}
              </Field>
              <ErrorMessage name="installments">
                {(msg) => <div className="error-message">{msg}</div>}
              </ErrorMessage>

              <button
                type="submit"
                disabled={loading}
                className="payment-button"
              >
                {loading ? 'מעבד...' : 'שלם עכשיו'}
              </button>

              {errorMsg && <div className="error-message">{errorMsg}</div>}
            </Form>
          )}
        </Formik>
      )}

      {paymentSuccess && (
        <div className="payment-success">
          <h4>✔️ התשלום בוצע בהצלחה!</h4>
          <button onClick={close} className="payment-button">
            סגור
          </button>
        </div>
      )}
    </div>
  );
};

export default CreditCardPayment;