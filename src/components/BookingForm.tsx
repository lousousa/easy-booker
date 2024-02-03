import React, { useState } from 'react'
import { useData } from '../DataProvider'
import styled from 'styled-components'
import localForage from 'localforage'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.min.css'

import { Booking } from '../types'

export default function BookingForm() {
  const [placeId, setPlaceId] = useState<number>(0)
  const [checkInDate, setCheckInDate] = useState(new Date())
  const [checkOutDate, setCheckOutDate] = useState(new Date())
  const { setData } = useData()!

  const placesOptions = [
    { id: 1, title: 'Crystal Cove Hotel' },
    { id: 2, title: 'Enchanted Garden Inn' },
    { id: 3, title: 'Golden Key Inn' },
    { id: 4, title: 'Grand Mirage Hotel' },
    { id: 5, title: 'Hidden Oasis Resort' },
    { id: 6, title: 'Mystic River Retreat' },
    { id: 7, title: 'Silver Moon Inn' },
    { id: 8, title: 'Starlight Citadel' },
    { id: 9, title: 'Twilight Tower Hotel' },
    { id: 10, title: 'Velvet Retreat' }
  ]

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

          {placesOptions.map(place =>
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
