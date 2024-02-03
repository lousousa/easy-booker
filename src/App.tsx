import { DataProvider } from './DataProvider'
import BookingForm from './components/BookingForm'
import BookingList from './components/BookingList'

function App() {
  return (
    <DataProvider>
      <h1>Easy Booker</h1>

      <BookingForm />

      <BookingList />
    </DataProvider>
  )
}

export default App
