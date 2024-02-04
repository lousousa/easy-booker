import React, { useState } from 'react'
import { useData } from './DataProvider'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import { availablePlaces, saveBooking } from '../data-manager'
import 'react-datepicker/dist/react-datepicker.min.css'


export default function BookingForm() {
  const [placeId, setPlaceId] = useState<number>(0)
  const [checkInDate, setCheckInDate] = useState(new Date())
  const [checkOutDate, setCheckOutDate] = useState(new Date())
  const { setData } = useData()!

  const handleSubmit = async (ev: React.SyntheticEvent) => {
    ev.preventDefault()
    const bookings = await saveBooking(placeId, checkInDate, checkOutDate)
    if (bookings) setData(bookings)
  }

  return (
    <Form
      onSubmit={handleSubmit}
    >
      <FormField>
        <label>Where</label>

        <select
          onChange={(ev) => {
            setPlaceId(parseInt(ev.target.value, 10))
          }}
        >
          {placeId === 0 && (<option>- Please select -</option>)}

          {availablePlaces.map(place =>
            <option
              key={'place_' + place.id}
              value={place.id}
            >
              {place.title}
            </option>
          )}
        </select>
      </FormField>

      <FormField>
        <label>Check-in</label>

        <DatePicker
          selected={checkInDate}
          onChange={(date: Date) => setCheckInDate(date)}
        />
      </FormField>

      <FormField>
        <label>Check-out</label>

        <DatePicker
          selected={checkOutDate}
          onChange={(date: Date) => setCheckOutDate(date)}
        />
      </FormField>

      <div>
        <button
          type="submit"
        >
          Save
        </button>
      </div>
    </Form>
  )
}

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 48px;
  gap: 24px;
`

const FormField = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  flex: 1;

  input {
    width: 100%;
  }
`
