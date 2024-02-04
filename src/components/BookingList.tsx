import moment from 'moment'
import { useData } from '../DataProvider'
import { availablePlaces, removeBooking } from '../data-manager'

export default function BookingList() {
  const { data, setData } = useData()!

  const removeItem = async (id: string) => {
    const bookings = await removeBooking(id)
    if (bookings) setData(bookings)
  }

  return (
    <div>
      <h2>My bookings</h2>

      <div>
        {data.length === 0 && (
          <p>You currently have no bookings.</p>
        )}

        {data.map(booking => (
          <div key={'booking_item_' + booking.id}>
            <div>
              {
              `${availablePlaces.find(place => place.id === booking.placeId)?.title}
              - ${moment(booking.checkInDate).format('MM/DD/YYYY')}
              - ${moment(booking.checkOutDate).format('MM/DD/YYYY')}`
              }
            </div>

            <div>
              <a
                onClick={() => removeItem(booking.id)}
              >
                Remove
              </a>

              <a>Update</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
