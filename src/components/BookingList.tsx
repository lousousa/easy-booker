import { useData } from '../DataProvider'

export default function BookingList() {
  const { data } = useData()!

  return (
    <ul>
      {data.map((booking, idx) => (
        <li key={'booking_item_' + idx}>{booking.placeId}</li>
      ))}
    </ul>
  )
}
