import { ReactNode } from 'react'

export interface Booking {
  placeId: number;
  checkInDate: Date;
  checkOutDate: Date
}

export interface DataContext {
  data: Booking[];
  setData: (value: Booking[]) => void
}

export interface DataProviderProps {
  children: ReactNode
}
