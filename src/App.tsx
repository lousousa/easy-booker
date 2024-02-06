import { DataProvider } from './components/DataProvider'
import BookingForm from './components/BookingForm'
import BookingList from './components/BookingList'
import styled from 'styled-components'

function App() {
  return (
    <DataProvider>
      <Container>
        <Content>
          <h1 data-testid="page-title">Easy Booker</h1>

          <BookingForm />

          <BookingList />
        </Content>
      </Container>
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
    font-size: 48px;
  }
`

const Container = styled.div`
  background-color: #f8f7f9;
  min-height: 100vh;
`

export default App
