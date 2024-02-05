import moment from 'moment'
import { useState } from 'react'
import { useData } from './DataProvider'
import { availablePlaces, removeBooking } from '../data-manager'
import styled from 'styled-components'
import Modal from './Modal'
import BookingForm from './BookingForm'

export default function BookingList() {
  const [bookingDetailsId, setBookingDetailsId] = useState<string | null>(null)
  const { data, setData } = useData()!

  const removeItem = async (id: string) => {
    const bookings = await removeBooking(id)
    if (bookings) setData(bookings)
  }

  const getPriceText = (id: string) => {
    const booking = data.find(booking => booking.id === id)
    if (!booking) return []

    const place = availablePlaces.find(place => place.id === booking.placeId)
    if (!place) return []

    const differenceInDays = moment(booking.checkOutDate).diff(moment(booking.checkInDate), 'days')

    const priceText = `$${place.pricePerNight * differenceInDays}`
    const priceDetails = differenceInDays > 1 ? `($${place.pricePerNight} x ${differenceInDays} nights)` : '(1 night)'

    return [priceText, priceDetails]
  }

  return (
    <Content>
      <Modal
        isOpen={bookingDetailsId !== null}
        onClose={() => setBookingDetailsId(null)}
      >
        <ModalTextTitle>Edit booking</ModalTextTitle>

        <BookingForm
          bookingId={bookingDetailsId!}
          onSave={() => setBookingDetailsId(null)}
        />
      </Modal>

      {data.length > 0 && (
        <>
          <TextTitle>My bookings</TextTitle>

          <ListContainer>
            {data.map(booking => (
              <DataGrid key={'booking_item_' + booking.id}>
                <div>
                  <h2>{availablePlaces.find(place => place.id === booking.placeId)?.title}</h2>
                  <p>{moment(booking.checkInDate).format('MM/DD/YYYY')} - {moment(booking.checkOutDate).format('MM/DD/YYYY')}</p>
                  <p><b>{getPriceText(booking.id)[0]}</b> {getPriceText(booking.id)[1]}</p>
                </div>

                <ActionGroup>
                  <a onClick={() => setBookingDetailsId(booking.id)}>Edit</a>

                  <a className='-is-danger' onClick={() => removeItem(booking.id)}>Remove</a>
                </ActionGroup>
              </DataGrid>
            ))}
          </ListContainer>
        </>
      )}
    </Content>
  )
}

const Content = styled.div`
  margin-top: 48px;
  width: 100%;
`

const ModalTextTitle = styled.h2`
  text-align: center;
  margin: 24px 0;
`

const TextTitle = styled.h2`
text-align: center;
margin-bottom: 48px;
`

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
`

const DataGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  align-items: center;
  padding: 12px;
  border-radius: 16px;
  gap: 24px;
  background-color: #fff;

  p {
    line-height: 24px;
  }

  @media (min-width: 640px) {
    grid-template-columns: 3fr 1fr;
    border-radius: 56px;

    div {
      padding: 8px 24px;
    }
  }
`

const ActionGroup = styled.div`
  display: flex;
  justify-content: end;
  gap: 24px;

  a {
    text-align: center;
    cursor: pointer;
  }
`
