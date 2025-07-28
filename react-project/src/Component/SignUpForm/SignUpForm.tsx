import { useState, FC } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import styles from './SignUpForm.module.scss';
import { useAppDispatch } from '../../hooks/hooks';
import { login } from '../../features/user/userSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import Header from '../Header/Header';
interface SignUpProps { }

const SignUpForm: FC<SignUpProps> = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // const from = (location.state as { from?: string })?.from || '/';
const from = location.state?.from || '/'
  const formik = useFormik({
    initialValues: {
      name: '',
      id: '',
      phoneNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object({
      name: yup.string().required('שדה חובה'),
      id: yup
        .string()
        .matches(/^\d{9}$/, 'תעודת זהות חייבת להיות 9 ספרות')
        .required('שדה חובה'),
      phoneNumber: yup
        .string()
        .matches(/^\d{10}$/, 'מספר טלפון חייב להיות 10 ספרות')
        .required('שדה חובה'),
      email: yup.string().email('מייל לא תקין').required('שדה חובה'),
      password: yup
        .string()
        .min(6, 'סיסמה חייבת להיות לפחות 6 תווים')
        .required('שדה חובה'),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'הסיסמאות אינן תואמות')
        .required('יש לאשר סיסמה'),
    }),

    onSubmit: async (values) => {
      try {
        setErrorMessage('');
        const response = await axios.post('http://localhost:8080/users/addUser', {
          name: values.name,
          email: values.email,
          password: values.password,
          phone: values.phoneNumber,
        });
        const userData = response.data;
        dispatch(login(userData));
        toast.success('ההרשמה בוצעה בהצלחה!');
        navigate(from);
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          const errorMsg = error.response?.data;
          const message = typeof errorMsg === 'string'
            ? errorMsg
            : errorMsg?.message || 'שגיאה בהרשמה';
          console.error('שגיאה:', message);
          setErrorMessage(message);
        }
      }
    }
  });

  return (
    
    <div className={styles.SignUp}>
      {!isSigningUp && (
        <>
          <h2>הרשמה</h2>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="name">שם</label>
              <input
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name}
                className={styles['form-control']}
              />
              {formik.touched.name && formik.errors.name && (
                <small className={styles['text-danger']}>{formik.errors.name}</small>
              )}
            </div>

            <div>
              <label htmlFor="id">תעודת זהות</label>
              <input
                id="id"
                name="id"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.id}
                className={styles['form-control']}
              />
              {formik.touched.id && formik.errors.id && (
                <small className={styles['text-danger']}>{formik.errors.id}</small>
              )}
            </div>

            <div>
              <label htmlFor="phoneNumber">טלפון</label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                className={styles['form-control']}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <small className={styles['text-danger']}>{formik.errors.phoneNumber}</small>
              )}
            </div>

            <div>
              <label htmlFor="email">אימייל</label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                className={styles['form-control']}
              />
              {formik.touched.email && formik.errors.email && (
                <small className={styles['text-danger']}>{formik.errors.email}</small>
              )}
            </div>

            <div>
              <label htmlFor="password">סיסמה</label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                className={styles['form-control']}
              />
              {formik.touched.password && formik.errors.password && (
                <small className={styles['text-danger']}>{formik.errors.password}</small>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword">אימות סיסמה</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                className={styles['form-control']}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <small className={styles['text-danger']}>{formik.errors.confirmPassword}</small>
              )}
            </div>

            {errorMessage && (
              <small className={styles['text-danger']}>{errorMessage}</small>
            )}

            <button type="submit" className={`${styles.btn} ${styles['btn-primary']} mt-3`}>
              הרשם
            </button>
          </form>
          <p>יש לך חשבון?</p>
          <a href="/login">כניסה</a>
        </>
      )}
    </div>
  );
};

export default SignUpForm;
