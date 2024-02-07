import { ReactNode } from 'react'

export interface Booking {
  id: string;
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

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  dataTestid?: string
}

export interface BookingDetailsProps {
  id: string;
  onSave?: () => void;
}

export interface BookingFormProps {
  bookingId?: string;
  onSave?: () => void;
}
