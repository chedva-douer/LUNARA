// import React, { FC, useState } from 'react';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import './OrderForm.scss';
// import { toast } from 'react-toastify';
// import { Room } from '../../Models/Room.model';
// import { useNavigate } from 'react-router-dom';
// import { FaUserAlt, FaChild, FaCalendarAlt } from 'react-icons/fa';
// import { RootState } from '../../app/store';
// import { useSelector } from 'react-redux';

// const UserIcon = FaUserAlt as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
// const ChildIcon = FaChild as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
// const CalendarIcon = FaCalendarAlt as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

// interface HotelDetailsProps {
//   hotelId: number;
//   setShowRooms: (showRooms: boolean) => void;
// }

// const OrderForm: FC<HotelDetailsProps> = ({ hotelId, setShowRooms }) => {
//   const user = useSelector((state: RootState) => state.user.user);

//   const [formData, setFormData] = useState({
//     adults: 0,
//     children: 0,
//     startDate: null as Date | null,
//     endDate: null as Date | null,
//   });

//   const navigate = useNavigate();

//   const handleDateChange = (dates: [Date | null, Date | null]) => {
//     const [start, end] = dates;
//     setFormData(prev => ({ ...prev, startDate: start, endDate: end }));
//   };

//   const handleNumberChange = (field: 'adults' | 'children', delta: number, max: number) => {
//     setFormData(prev => {
//       const newValue = Math.min(max, Math.max(0, prev[field] + delta));
//       return { ...prev, [field]: newValue };
//     });
//   };

//   const handleSubmit = async () => {
//     if (!formData.startDate || !formData.endDate) {
//       toast.error("יש לבחור טווח תאריכים");
//       return;
//     }

//     try {
//       const response = await fetch(`http://localhost:8080/rooms/by-hotel/1`, {
//         method: 'GET',
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setShowRooms(true);  
//         toast.success('נמצאו חדרים מתאימים!');
//       } else {
//         const errorText = await response.text();
//         toast.error(errorText || 'לא נמצאו חדרים מתאימים');
//       }
//     } catch (error) {
//       toast.error('שגיאה בשרת');
//       console.error('שגיאה:', error);
//     }
//   };

//   return (
//     <>
//       <div className="order-form-bar">
//         <div className="input-group">
//           <UserIcon className="icon" />
//           <label>מבוגרים</label>
//           <div className="custom-number-input">
//             <button onClick={() => handleNumberChange('adults', -1, 10)}>-</button>
//             <input type="text" readOnly value={formData.adults} />
//             <button onClick={() => handleNumberChange('adults', 1, 10)}>+</button>
//           </div>
//         </div>

//         <div className="input-group">
//           <ChildIcon className="icon" />
//           <label>ילדים</label>
//           <div className="custom-number-input">
//             <button onClick={() => handleNumberChange('children', -1, 20)}>-</button>
//             <input type="text" readOnly value={formData.children} />
//             <button onClick={() => handleNumberChange('children', 1, 20)}>+</button>
//           </div>
//         </div>

//         <div className="input-group date-picker-group">
//           <CalendarIcon className="icon" />
//           <label>טווח תאריכים</label>
//           <DatePicker
//             selected={formData.startDate}
//             onChange={handleDateChange}
//             startDate={formData.startDate}
//             endDate={formData.endDate}
//             selectsRange
//             minDate={new Date()}
//             dateFormat="dd/MM/yyyy"
//             placeholderText="בחר טווח תאריכים"
//             isClearable
//             className="date-picker-input"
//           />
//         </div>

//         <button className="submit-button" onClick={handleSubmit}>חפש חדרים</button>
//       </div>
//     </>
//   );
// };

// export default OrderForm;
import React, { FC, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './OrderForm.scss';
import { toast } from 'react-toastify';
import { Room } from '../../Models/Room.model';
import { useNavigate } from 'react-router-dom';

import { FaUserAlt } from 'react-icons/fa';
import { FaChild } from 'react-icons/fa';
import { FaCalendarAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';


const UserIcon = FaUserAlt as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const ChildIcon = FaChild as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const CalendarIcon = FaCalendarAlt as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
interface OrderFormProps {
  onRoomsFound: (rooms: Room[]) => void;
  selectedDates: { startDate: Date | null, endDate: Date | null };
  setSelectedDates: React.Dispatch<React.SetStateAction<{ startDate: Date | null, endDate: Date | null }>>;
}

const OrderForm: FC<OrderFormProps> = ({ onRoomsFound ,setSelectedDates}) => {
  const user = useSelector((state: RootState) => state.user.user);

  const [formData, setFormData] = useState({
    adults: 0,
    children: 0,
    startDate: null as Date | null,
    endDate: null as Date | null,
  });

  const navigate = useNavigate();

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setFormData(prev => ({ ...prev, startDate: start, endDate: end }));
    setSelectedDates({ startDate: start, endDate: end }); // ⬅️ חשוב!
  };

  const handleNumberChange = (field: 'adults' | 'children', delta: number, max: number) => {
    setFormData(prev => {
      const newValue = Math.min(max, Math.max(0, prev[field] + delta));
      return { ...prev, [field]: newValue };
    });
  };

  const handleSubmit = async () => {
    if (!formData.startDate || !formData.endDate) {
      toast.error("יש לבחור טווח תאריכים");
      return;
    }

    const params = new URLSearchParams({
      numberOfAdults: formData.adults.toString(),
      numberOfChildren: formData.children.toString(),
      checkInDate: formData.startDate.toISOString().split('T')[0],
      checkOutDate: formData.endDate.toISOString().split('T')[0],
    });

    try {
      const response = await fetch(`http://localhost:8080/rooms/search?${params.toString()}`, {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        onRoomsFound(data);
        toast.success('נמצאו חדרים מתאימים!');
      } else {
        const errorText = await response.text();
        toast.error(errorText || 'לא נמצאו חדרים מתאימים');
      }
    } catch (error) {
      toast.error('שגיאה בשרת');
      console.error('שגיאה:', error);
    }
  };

  const selectRoomAndPay = (room: Room) => {
    if (!formData.startDate || !formData.endDate) {
      toast.error("טווח תאריכים לא תקין");
      return;
    }

    navigate('/payment', {
      state: {
        roomIds: [room.roomId],
        userId: user?.id,
        checkInDate: formData.startDate.toISOString().split('T')[0],
        checkOutDate: formData.endDate.toISOString().split('T')[0],
        amount: Number(room.roomPrice),
      }
    });
  };

  return (
    <>
      <h3>הזמנת שירות</h3>

      <div className="order-form-bar">
        <div className="input-group">
          <UserIcon className="icon" />
          <label>מבוגרים</label>
          <div className="custom-number-input">
            <button onClick={() => handleNumberChange('adults', -1, 10)}>-</button>
            <input type="text" readOnly value={formData.adults} />
            <button onClick={() => handleNumberChange('adults', 1, 10)}>+</button>
          </div>
        </div>

        <div className="input-group">
          <ChildIcon className="icon" />
          <label>ילדים</label>
          <div className="custom-number-input">
            <button onClick={() => handleNumberChange('children', -1, 20)}>-</button>
            <input type="text" readOnly value={formData.children} />
            <button onClick={() => handleNumberChange('children', 1, 20)}>+</button>
          </div>
        </div>

        <div className="input-group date-picker-group">
          <CalendarIcon className="icon" />
          <label>טווח תאריכים</label>
          <DatePicker
            selected={formData.startDate}
            onChange={handleDateChange}
            startDate={formData.startDate}
            endDate={formData.endDate}
            selectsRange
            minDate={new Date()}
            dateFormat="dd-MM-yyyy"
            placeholderText="בחר טווח תאריכים"
            isClearable
            className="date-picker-input"
          />
        </div>

        <button
          className="submit-button"
          onClick={handleSubmit}
          disabled={!formData.startDate || !formData.endDate}
        >
          חפש חדרים
        </button>      </div>
    </>
  );
};

export default OrderForm;