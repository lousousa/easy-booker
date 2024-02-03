import React, { useState } from 'react'
import { useData } from '../DataProvider'
import styled from 'styled-components'
import localForage from 'localforage'
import DatePicker from 'react-datepicker'
import { availablePlaces } from '../DataProvider'
import 'react-datepicker/dist/react-datepicker.min.css'

import { Booking } from '../types'

export default function BookingForm() {
  const [placeId, setPlaceId] = useState<number>(0)
  const [checkInDate, setCheckInDate] = useState(new Date())
  const [checkOutDate, setCheckOutDate] = useState(new Date())
  const { setData } = useData()!

  const handleSubmit = async (ev: React.SyntheticEvent) => {
    ev.preventDefault()

    let bookings: Booking[] | null = await localForage.getItem('bookings')
    if (!bookings) bookings = []

    bookings.push({ placeId, checkInDate, checkOutDate })
    await localForage.setItem('bookings', bookings)
    setData(bookings)
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

      <button
        type="submit"
      >
        Save
      </button>
    </Form>
  )
}

const Form = styled.form`
  display: flex;
`

const FormField = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`
