import moment from 'moment'
import { useData } from './DataProvider'
import { availablePlaces, removeBooking } from '../data-manager'
import styled from 'styled-components'

export default function BookingList() {
  const { data, setData } = useData()!

  const removeItem = async (id: string) => {
    const bookings = await removeBooking(id)
    if (bookings) setData(bookings)
  }

  const getPriceText = (id: string) => {
    const booking = data.find(booking => booking.id === id)
    if (!booking) return ''

    const place = availablePlaces.find(place => place.id === booking.placeId)
    if (!place) return ''

    const differenceInDays = moment(booking.checkOutDate).diff(moment(booking.checkInDate), 'days')

    const priceText = `$${place.pricePerNight * differenceInDays}`
    const priceDetails = differenceInDays > 1 ? ` ($${place.pricePerNight} x ${differenceInDays} nights)` : ' (1 night)'

    return priceText + priceDetails
  }

  return (
    <Content>
      <h2>My bookings</h2>

      <ListContainer className={`${data.length > 0 && '-has-data'}`}>
        {data.length === 0 && (
          <p>You currently have no bookings.</p>
        )}

        {data.length > 0 && (
          <DataGrid className="-is-header">
            <div>Where</div>
            <div>Check-in</div>
            <div>Check-out</div>
            <div>Price</div>
            <div>Manage</div>
          </DataGrid>
        )}

        {data.map(booking => (
          <DataGrid key={'booking_item_' + booking.id}>
            <div>{availablePlaces.find(place => place.id === booking.placeId)?.title}</div>
            <div>{moment(booking.checkInDate).format('MM/DD/YYYY')}</div>
            <div>{moment(booking.checkOutDate).format('MM/DD/YYYY')}</div>
            <div>{getPriceText(booking.id)}</div>
            <div className="-is-action-group">
              <a
                onClick={() => removeItem(booking.id)}
              >
                Remove
              </a>

              <a>Update</a>
            </div>
          </DataGrid>
        ))}
      </ListContainer>
    </Content>
  )
}

const Content = styled.div`
  margin-top: 48px;
  width: 100%;

  h2 {
    text-align: center;
  }
`
const ListContainer = styled.div`
  margin-top: 24px;

  &.-has-data {
    border-bottom: 1px solid #bbb;
    border-right: 1px solid #bbb;
  }

  p {
    text-align: center;
  }
`
const DataGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1.5fr 1.5fr 2fr 2fr;

  &.-is-header {
    font-weight: 600;
    text-align: center;
  }

  div {
    padding: 4px 8px;
    border-top: 1px solid #bbb;
    border-left: 1px solid #bbb;

    &.-is-action-group {
      display: flex;

      a {
        flex: 1;
        text-align: center;
        cursor: pointer;
      }
    }
  }
`
