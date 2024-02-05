import { DataProvider } from './components/DataProvider'
import BookingForm from './components/BookingForm'
import BookingList from './components/BookingList'
import styled from 'styled-components'

function App() {
  return (
    <DataProvider>
      <Content>
        <h1>Easy Booker</h1>

        <BookingForm />

        <BookingList />
      </Content>
    </DataProvider>
  )
}

const Content = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 688px;
  margin: 0 auto;
  padding: 0 12px 48px;

  h1 {
    width: 100%;
    text-align: center;
    margin: 48px 0;
  }
`

export default App
