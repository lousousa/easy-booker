import localForage from 'localforage'

import { Booking } from './types'

export const availablePlaces = [
  { id: 1, title: 'Crystal Cove Hotel' },
  { id: 2, title: 'Enchanted Garden Inn' },
  { id: 3, title: 'Golden Key Inn' },
  { id: 4, title: 'Grand Mirage Hotel' },
  { id: 5, title: 'Hidden Oasis Resort' },
  { id: 6, title: 'Mystic River Retreat' },
  { id: 7, title: 'Silver Moon Inn' },
  { id: 8, title: 'Starlight Citadel' },
  { id: 9, title: 'Twilight Tower Hotel' },
  { id: 10, title: 'Velvet Retreat' }
]

export const saveBooking = async (placeId: number, checkInDate: Date, checkOutDate: Date) => {
  const bookings: Booking[] | null = await localForage.getItem('bookings')
  if (!bookings) return

  const timestamp = new Date().getTime()
  const id = timestamp.toString(36) + Math.random().toString(36)

  bookings.push({ id, placeId, checkInDate, checkOutDate })
  await localForage.setItem('bookings', bookings)

  return bookings
}

export const removeBooking = async (id: string) => {
  const bookings: Booking[] | null = await localForage.getItem('bookings')
  if (!bookings) return

  const updatedBookings = bookings.filter(booking => booking.id !== id)
  await localForage.setItem('bookings', updatedBookings)

  return updatedBookings
}
