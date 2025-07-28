import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './LoginForm.module.scss';
import { useAppDispatch } from '../../hooks/hooks';
import { login } from '../../features/user/userSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
const LoginForm: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const from = (location.state as { from?: string })?.from || '/';
  const user = useSelector((state: RootState) => state.user.user);

  // useEffect(() => {
  //   if (user && user.userName) {
  //     toast.success(`שלום ${user.userName}!`);
  //   }
  // }, [user]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object({
      email: yup.string().email('מייל לא תקין').required('שדה חובה'),
      password: yup.string().min(6, 'סיסמה חייבת להיות לפחות 6 תווים').required('שדה חובה'),
    }),
    onSubmit: async (values) => {
      try {
        setErrorMessage('');
        const response = await fetch('http://localhost:8080/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        });
        if (response.ok) {
          const userData = await response.json();
          dispatch(login(userData));
          toast.success('התחברת בהצלחה!');
          navigate('/');
        } else {
          const errorText = await response.text();
          setErrorMessage(errorText || 'שגיאה בהתחברות');
        }
      } catch (error) {
        setErrorMessage('שגיאה בשרת');
        console.error('שגיאה:', error);
      }
    }
  });

  const handleGoogleLogin = async (credentialResponse: any) => {
    try {
      const credential = credentialResponse.credential;
      if (!credential) {
        toast.error('ההתחברות נכשלה');
        return;
      }

      const decoded: any = jwtDecode(credential);
      const googleUser = {
        email: decoded.email,
        userName: decoded.name,
        picture: decoded.picture,
        googleId: decoded.sub,
      };

      const response = await fetch('http://localhost:8080/users/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(googleUser),
      });

      if (response.ok) {
        const userData = await response.json();
        dispatch(login(userData));
        toast.success(`שלום ${userData.userName}!`);
        navigate('/');
      } else {
        toast.error('שגיאה בהתחברות עם Google');
      }
    } catch (err) {
      console.error('Google login error:', err);
      toast.error('שגיאה בהתחברות עם Google');
    }
  };

  return (
    <div className={styles.LoginForm}>
      {!user && (
        <>
          <h2 className={styles.title}>התחברות</h2>
          <form onSubmit={formik.handleSubmit} noValidate>
            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>אימייל</label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={styles.input}
              />
              {formik.touched.email && formik.errors.email && (
                <small className={styles.error}>{formik.errors.email}</small>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="password" className={styles.label}>סיסמה</label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className={styles.input}
              />
              {formik.touched.password && formik.errors.password && (
                <small className={styles.error}>{formik.errors.password}</small>
              )}
            </div>

            {errorMessage && <small className={styles.error}>{errorMessage}</small>}

            <button type="submit" className={styles.submitBtn}>התחבר</button>
          </form>

          <div className={styles.googleLogin}>
            <p>או התחבר עם Google:</p>
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => toast.error('שגיאה בהתחברות עם Google')}
            />
          </div>

          <p>עדיין אין לך חשבון?</p>
          <a href="/signup">הרשמה</a>
        </>
      )}
    </div>
  );
};

export default LoginForm;
