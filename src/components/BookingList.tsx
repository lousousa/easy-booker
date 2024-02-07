import moment from 'moment'
import { useState } from 'react'
import { useData } from './DataProvider'
import { availablePlaces, getPriceTextData, removeBooking } from '../data-manager'
import styled from 'styled-components'
import Modal from './Modal'
import BookingForm from './BookingForm'

export default function BookingList() {
  const [bookingDetailsId, setBookingDetailsId] = useState<string | null>(null)
  const [removingId, setRemovingId] = useState<string | null>(null)
  const { data, setData } = useData()!

  const removeItem = async () => {
    const bookings = await removeBooking(removingId!)
    if (bookings) setData(bookings)

    setRemovingId(null)
  }

  const getPriceText = (id: string) => {
    const booking = data.find(booking => booking.id === id)
    if (!booking) return []

    return getPriceTextData({...booking})
  }

  return (
    <Content
      data-testid="booking-list"
    >
      <Modal
        isOpen={bookingDetailsId !== null}
        onClose={() => setBookingDetailsId(null)}
        dataTestid="edit-modal"
      >
        <ModalTextTitle>Edit booking</ModalTextTitle>

        <BookingForm
          bookingId={bookingDetailsId!}
          onSave={() => setBookingDetailsId(null)}
        />
      </Modal>

      <Modal
        isOpen={removingId !== null}
        onClose={() => setRemovingId(null)}
        dataTestid="confirmation-modal"
      >
        <ConfirmationModalContainer>
          <h3>Are you sure?</h3>

          <div>
            <ConfirmButton
              onClick={() => removeItem()}
              data-testid="modal-confirm-button"
            >
              Remove
            </ConfirmButton>

            <CancelButton
              onClick={() => setRemovingId(null)}
              data-testid="modal-cancel-button"
            >
              Cancel
            </CancelButton>
          </div>
        </ConfirmationModalContainer>
      </Modal>

      {data.length > 0 && (
        <>
          <TextTitle>My bookings</TextTitle>

          <ListContainer>
            {data.map(booking => (
              <DataGrid key={'booking_item_' + booking.id}>
                <div>
                  <h2
                    data-testid="item-text-title"
                  >
                    {availablePlaces.find(place => place.id === booking.placeId)?.title}
                  </h2>
                  <p>{moment(booking.checkInDate).format('MM/DD/YYYY')} - {moment(booking.checkOutDate).format('MM/DD/YYYY')}</p>
                  <p><b>{getPriceText(booking.id)[0]}</b> {getPriceText(booking.id)[1]}</p>
                </div>

                <ActionGroup>
                  <a
                    onClick={() => setBookingDetailsId(booking.id)}
                    data-testid="item-edit-button"
                  >
                    Edit
                  </a>

                  <a
                    className='-is-danger'
                    onClick={() => setRemovingId(booking.id)}
                    data-testid="item-remove-button"
                  >
                    Remove
                  </a>
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

const ConfirmationModalContainer = styled.div`
  width: 360px;
  max-width: 100%;
  height: 170px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > h3 {
    margin-bottom: 24px;
  }

  > div {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 24px;
  }

  button {
    cursor: pointer;
    padding: 8px 24px;
    font-size: 16px;
    border-radius: 16px;
    font-weight: 600;
  }
`
const ConfirmButton = styled.button`
  border: 1px solid #dd2d4a;
  color: #dd2d4a;
  background: none;

  &:hover {
    background-color: #dd2d4a;
    color: #fff;
  }
`

const CancelButton = styled.button`
  border: 1px solid #999;
  color: #999;
  background: none;

  &:hover {
    background-color: #999;
    color: #fff;
  }
`
