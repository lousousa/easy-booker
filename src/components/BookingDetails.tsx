import { useEffect, useState } from 'react'
import { useData } from './DataProvider'

import { BookingDetailsProps, Booking } from '../types'

export default function BookingDetails({ id }: BookingDetailsProps) {
  const [booking, setBooking] = useState<Booking | null>(null)

  const { data } = useData()!

  useEffect(() => {
    const currentBooking = data.find(booking => booking.id === id)
    if (!currentBooking) return

    setBooking(currentBooking)
  }, [])

  return (
    <div>
      <h1>{booking?.placeId}</h1>
    </div>
  )
}
