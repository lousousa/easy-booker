import { useEffect, useState, useContext, createContext } from 'react'
import localForage from 'localforage'

import { Booking, DataContext, DataProviderProps } from '../types'

const DataContext = createContext<DataContext | null>(null)

export const DataProvider = ({ children }: DataProviderProps) => {
  const [data, setData] = useState<Booking[]>([])

  const loadData = async () => {
    const bookings = await localForage.getItem<Booking[]>('bookings')

    if (!bookings) await localForage.setItem('bookings', [])

    setData(bookings || [])
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

