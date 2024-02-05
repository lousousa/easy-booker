import React, { useEffect, useState } from 'react'
import { useData } from './DataProvider'
import styled from 'styled-components'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import { availablePlaces, saveBooking } from '../data-manager'
import { BookingFormProps } from '../types'
import 'react-datepicker/dist/react-datepicker.min.css'

export default function BookingForm({ bookingId, onSave }: BookingFormProps) {
  const [placeId, setPlaceId] = useState<number>(0)
  const [checkInDate, setCheckInDate] = useState<Date | null>(null)
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null)
  const [intervalLock, setIntervalLock] = useState<{ start: Date; end: Date; } | null>(null)
  const [price, setPrice] = useState<string>('-')
  const [excludeDateIntervals, setExcludeDateIntervals] = useState<{ start: Date; end: Date; }[]>([])
  const { data, setData } = useData()!

  useEffect(() => {
    if (!bookingId) return

    const currentBooking = data.find(booking => booking.id === bookingId)
    if (!currentBooking) return

    setPlaceId(currentBooking.placeId)
    setCheckInDate(currentBooking.checkInDate)
    setCheckOutDate(currentBooking.checkOutDate)
  }, [])

  useEffect(() => {
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
  }, [data])

  useEffect(() => {
    if (placeId === 0 || !checkInDate || !checkOutDate) return setPrice('-')

    const place = availablePlaces.find(place => place.id === placeId)
    if (!place?.pricePerNight) return setPrice('-')

    const differenceInDays = moment(checkOutDate).diff(moment(checkInDate), 'days')

    const priceText = `$${place.pricePerNight * differenceInDays}`
    const priceDetails = differenceInDays > 1 ? ` ($${place.pricePerNight} x ${differenceInDays} nights)` : ' (1 night)'

    setPrice(priceText + priceDetails)
  }, [placeId, checkInDate, checkOutDate])

  useEffect(() => {
    if (!checkInDate) return setIntervalLock(null)

    const lock = excludeDateIntervals.find(interval => interval.start.getTime() > checkInDate.getTime())
    setIntervalLock(lock || null)

  }, [checkInDate])

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
          value={placeId}
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
          placeholderText='- Please select -'
        />
      </FormField>

      <div />

      <FormField>
        <label>Price</label>

        <p>{price}</p>
      </FormField>

      <div>
        <SubmitButton
          type="submit"
          disabled={price === '-'}
        >
          Save
        </SubmitButton>
      </div>
    </Form>
  )
}

const Form = styled.form`
  display: grid;
  grid-template-columns: 1.25fr repeat(2, 1fr);
  align-items: end;
  width: 100%;
  margin-top: 48px;
  gap: 24px;
`

const FormField = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  flex: 1;

  input, select, p {
    width: 100%;
    margin-top: 4px;
    font-size: 16px;
    padding: 4px 0;
  }

  input, select {
    padding: 4px 8px;
  }
`

const SubmitButton = styled.button`
  padding: 4px 8px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
`
