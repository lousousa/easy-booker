import { useEffect, useState, useContext, createContext } from 'react'
import localForage from 'localforage'

import { Booking, DataContext, DataProviderProps } from './types'

const DataContext = createContext<DataContext | null>(null)

export const DataProvider = ({ children }: DataProviderProps) => {
  const [data, setData] = useState<Booking[]>([])

  const loadData = async () => {
    const bookings = await localForage.getItem<Booking[]>('bookings')
    if (bookings) setData(bookings)
  }

  useEffect(() => { loadData() }, [])

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => {
  const context = useContext(DataContext)

  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider')
  }

  return context
}

export const availablePlaces = [
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
