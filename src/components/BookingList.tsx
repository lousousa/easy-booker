import moment from 'moment'
import { useData } from '../DataProvider'
import { availablePlaces } from '../DataProvider'

export default function BookingList() {
  const { data } = useData()!

  return (
    <ul>
      {data.map((booking, idx) => (
        <li key={'booking_item_' + idx}>
          {
          `${availablePlaces.find(place => place.id === booking.placeId)?.title}
           - ${moment(booking.checkInDate).format('MM/DD/YYYY')}
           - ${moment(booking.checkOutDate).format('MM/DD/YYYY')}`
          }
        </li>
      ))}
    </ul>
  )
}
