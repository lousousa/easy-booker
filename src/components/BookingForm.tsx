import React, { useEffect, useState } from 'react'
import { useData } from './DataProvider'
import styled from 'styled-components'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import { availablePlaces, getPriceTextData, saveBooking } from '../data-manager'
import { BookingFormProps } from '../types'
import 'react-datepicker/dist/react-datepicker.min.css'

export default function BookingForm({ bookingId, onSave }: BookingFormProps) {
  const [placeId, setPlaceId] = useState<number>(0)
  const [checkInDate, setCheckInDate] = useState<Date | null>(null)
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null)
  const [intervalLock, setIntervalLock] = useState<{ start: Date; end: Date; } | null>(null)
  const [price, setPrice] = useState<string[]>([])
  const [excludeDateIntervals, setExcludeDateIntervals] = useState<{ start: Date; end: Date; }[]>([])
  const { data, setData } = useData()!

  const handleExcludeDateIntervals = () => {
    const intervals: { start: Date; end: Date; }[] = []

    data.forEach(booking => {
      if (booking.id !== bookingId)
        intervals.push({ start: booking.checkInDate, end: booking.checkOutDate })
    })

    intervals.sort((a, b) => {
      if (a.start.getTime() === b.start.getTime()) {
        return a.end.getTime() < b.end.getTime() ? -1 : 1
      }
      return a.start.getTime() < a.start.getTime() ? -1 : 1
    })

    setExcludeDateIntervals(intervals)
  }

  const loadBookingById = () => {
    if (!bookingId) return

    const currentBooking = data.find(booking => booking.id === bookingId)
    if (!currentBooking) return

    setPlaceId(currentBooking.placeId)
    setCheckInDate(currentBooking.checkInDate)
    setCheckOutDate(currentBooking.checkOutDate)
  }

  const handlePriceOutput = () => {
    if (placeId === 0 || !checkInDate || !checkOutDate) return setPrice([])

    setPrice(getPriceTextData({ placeId, checkInDate, checkOutDate }))
  }

  const handleDatesIntervalLock = () => {
    if (!checkInDate) return setIntervalLock(null)

    const lock = excludeDateIntervals.find(interval => interval.start.getTime() > checkInDate.getTime())
    setIntervalLock(lock || null)
  }

  const handleSubmit = async (ev: React.SyntheticEvent) => {
    ev.preventDefault()

    if (!checkInDate || !checkOutDate || placeId === 0) return

    const bookings = await saveBooking(bookingId, placeId, checkInDate, checkOutDate)
    if (bookings) setData(bookings)

    setPlaceId(0)
    setCheckInDate(null)
    setCheckOutDate(null)

    if (onSave) onSave()
  }

  useEffect(loadBookingById, [])
  useEffect(handleExcludeDateIntervals, [data])
  useEffect(handlePriceOutput, [placeId, checkInDate, checkOutDate])
  useEffect(handleDatesIntervalLock, [checkInDate])

  return (
    <Form
      onSubmit={handleSubmit}
      data-testid="booking-form"
    >
      <FormField>
        <label>Where</label>

        <select
          onChange={(ev) => {
            setPlaceId(parseInt(ev.target.value, 10))
          }}
          value={placeId}
          data-testid="form-place-select"
        >
          {placeId === 0 && (<option>- Please select -</option>)}

          {availablePlaces.map(place =>
            <option
              key={'place_' + place.id}
              value={place.id}
            >
              {place.title} - ${place.pricePerNight} night
            </option>
          )}
        </select>
      </FormField>

      <FormField>
        <label>Check-in</label>

        <DatePicker
          selected={checkInDate}
          onChange={(date: Date) => {
            setCheckOutDate(null)
            setCheckInDate(date)
          }}
          selectsStart
          startDate={checkInDate}
          endDate={checkOutDate}
          minDate={new Date()}
          excludeDateIntervals={excludeDateIntervals}
          placeholderText='- Please select -'
        />
      </FormField>

      <FormField>
        <label>Check-out</label>

        <DatePicker
          disabled={!checkInDate}
          selected={checkOutDate}
          onChange={(date: Date) => setCheckOutDate(date)}
          selectsEnd
          startDate={moment(checkInDate).add(1, 'days').toDate()}
          endDate={checkOutDate}
          minDate={moment(checkInDate).add(1, 'days').toDate()}
          maxDate={intervalLock?.start || null}
          excludeDateIntervals={excludeDateIntervals}
          placeholderText="- Please select -"
        />
      </FormField>

      <FormField>
        <label>Price</label>

        {price.length === 0 && <p>-</p>}

        {price.length > 0 && <p data-testid="form-price-message"><b>{price[0]}</b> {price[1]}</p>}
      </FormField>

      <div>
        <SubmitButton
          type="submit"
          disabled={price.length === 0}
          data-testid="form-submit-button"
        >
          Save
        </SubmitButton>
      </div>
    </Form>
  )
}

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  align-items: end;
  width: 100%;
  gap: 12px;
  padding: 12px;
  border-radius: 16px;
  background-color: #fff;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    padding: 24px;

    > div:first-child {
      grid-column: span 2;
    }
  }
`

const FormField = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;

  input, select, p {
    width: 100%;
    margin-top: 4px;
    font-size: 16px;
    padding: 4px 0;
    border-radius: 8px;
  }

  input, select {
    padding: 8px;
    border: 1px solid #ddd;
  }
`

const SubmitButton = styled.button`
  padding: 8px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  border-radius: 16px;
  border: none;
  font-weight: 600;
  background-color: #1C93F3;
  color: #fff;

  &:disabled {
    background-color: #F1F2F6;
    color: #888;
  }
`
