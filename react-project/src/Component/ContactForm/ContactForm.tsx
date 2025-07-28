import React, { useState } from 'react';
import styles from './ContactForm.module.scss';
import { toast } from 'react-toastify';
import Header from '../Header/Header';

const ContactForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new URLSearchParams();
      formData.append('userEmail', form.email);
      formData.append('messageText', form.message);

      const response = await fetch('http://localhost:8080/mail/sendSupport', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData.toString()
      });

      if (response.ok) {
        toast.success('ההודעה נשלחה בהצלחה!');
        setForm({ name: '', email: '', message: '' });
      } else {
        const errorText = await response.text();
        toast.error(`שגיאה בשליחה: ${errorText}`);
      }
    } catch (error) {
      toast.error('אירעה שגיאה בלתי צפויה');
    }
  };


  return (
    <div>
      <Header></Header>

      <div className={styles.container}>
        <h2 className={styles.title}>צור קשר</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="שם מלא"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="אימייל"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="ההודעה שלך"
            value={form.message}
            onChange={handleChange}
            required
          />
          <button type="submit">שלח</button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
