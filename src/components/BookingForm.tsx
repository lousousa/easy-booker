import styled from 'styled-components'

export default function BookingForm() {
  const placesOptions = [
    'Crystal Cove Hotel',
    'Enchanted Garden Inn',
    'Golden Key Inn',
    'Grand Mirage Hotel',
    'Hidden Oasis Resort',
    'Mystic River Retreat',
    'Silver Moon Inn',
    'Starlight Citadel',
    'Twilight Tower Hotel',
    'Velvet Retreat'
  ]

  return (
    <Form>
      <FormField>
        <label>Where</label>

        <select>
          <option>- Please select -</option>

          { placesOptions.map(option => <option>{ option }</option>) }
        </select>
      </FormField>

      <FormField>
        <label>Check-in</label>
        <input />
      </FormField>

      <FormField>
        <label>Check-out</label>
        <input />
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
