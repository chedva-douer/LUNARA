import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Room } from '../../Models/Room.model'

type Reservation = {
  hotelName: string
  date: string
}
export type Order= {
  roomId: Number,
  userId: Number,
  checkInDate: Date,
  checkOutDate: Date,
  rooms?: Room[]
}
type User = {
  id: number
  userName: string
  userEmail: string
  userPhone: string
  orders: Order[]
}

type UserState = {
  isLoggedIn: boolean
  user: User | null
}

const initialState: UserState = {
  isLoggedIn: false,
  user: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.isLoggedIn = true
      state.user = action.payload
    },
    logout(state) {
      state.isLoggedIn = false
      state.user = null
    },
    updateProfile(state, action: PayloadAction<Partial<User>>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
      }
    },
    addOrder(state, action: PayloadAction<Order>) {
      if (state.user) {
        state.user.orders.push(action.payload)
      }
    },
  },
})

export const { login, logout, updateProfile, addOrder } = userSlice.actions
export default userSlice.reducer
