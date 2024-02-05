import localForage from 'localforage'
import moment from 'moment'

import { Booking } from './types'

export const availablePlaces = [
  { id: 1, title: 'Crystal Cove Hotel', pricePerNight: 230 },
  { id: 2, title: 'Enchanted Garden Inn', pricePerNight: 440 },
  { id: 3, title: 'Golden Key Inn', pricePerNight: 250 },
  { id: 4, title: 'Grand Mirage Hotel', pricePerNight: 340 },
  { id: 5, title: 'Hidden Oasis Resort', pricePerNight: 580 },
  { id: 6, title: 'Mystic River Retreat', pricePerNight: 650 },
  { id: 7, title: 'Silver Moon Inn', pricePerNight: 480 },
  { id: 8, title: 'Starlight Citadel', pricePerNight: 280 },
  { id: 9, title: 'Twilight Tower Hotel', pricePerNight: 350 },
  { id: 10, title: 'Velvet Retreat', pricePerNight: 520 }
]

export const saveBooking = async (id: string | undefined, placeId: number, checkInDate: Date, checkOutDate: Date) => {
  let bookings: Booking[] | null = await localForage.getItem('bookings')
  if (!bookings) return

  if (!id) {
    const timestamp = new Date().getTime()
    id = timestamp.toString(36) + Math.random().toString(36)
  }

  bookings = bookings.filter(booking => booking.id !== id)
  bookings.push({ id, placeId, checkInDate, checkOutDate })
  bookings.sort((a, b) => a.checkInDate.getTime() - b.checkInDate.getTime())

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

export const getPriceTextData = (
  { placeId, checkInDate, checkOutDate }:
    { placeId: number, checkInDate: Date, checkOutDate: Date }
  ) => {
  const place = availablePlaces.find(place => place.id === placeId)
  if (!place) return []

  const differenceInDays = moment(checkOutDate).diff(moment(checkInDate), 'days')

  const priceText = `$${place.pricePerNight * differenceInDays}`
  const priceDetails = differenceInDays > 1 ? `($${place.pricePerNight} x ${differenceInDays} nights)` : '(1 night)'

  return [priceText, priceDetails]
}
