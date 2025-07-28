import React, { lazy, Suspense } from 'react';
import { Room } from '../../Models/Room.model';

type OrderFormProps = {
  setShowRooms: (showRooms: boolean) => void;
  hotelId: number;
  children?: React.ReactNode;
};

// const LazyOrderForm = lazy<React.ComponentType<OrderFormProps>>(() => import('./OrderForm'));
const LazyOrderForm = lazy(() => import('./OrderForm'));
const OrderForm = (props: OrderFormProps) => (
  <Suspense fallback={null}>
    <LazyOrderForm selectedDates={{
      startDate: null,
      endDate: null
    }} setSelectedDates={function (value: React.SetStateAction<{ startDate: Date | null; endDate: Date | null; }>): void {
      throw new Error('Function not implemented.');
    } } onRoomsFound={function (rooms: Room[]): void {
      throw new Error('Function not implemented.');
    } } {...props} />
  </Suspense>
);

export default OrderForm;
