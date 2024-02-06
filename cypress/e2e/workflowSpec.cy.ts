import { availablePlaces } from '../../src/data-manager'
import moment from 'moment'

describe('Workflow spec', () => {
  beforeEach(() => {
    cy.visit( 'http://127.0.0.1:5173/ ')
  })

  it('renders the page title', () => {
    cy.get('[data-testid="page-title"]').should('have.text', 'Easy Booker')
  })

  it('disables the submit button if the form inputs aren\'t valid', () => {
    cy.get('[data-testid="form-submit-button"').should('be.disabled')
  })

  it('renders available places to the place select', () => {
    availablePlaces.forEach(option => {
      cy.get('[data-testid="form-place-select"]').should('contain', option.title)
    })
  })

  const fillAllTheInputs = () => {
    cy.get('[data-testid="form-place-select"]').select(availablePlaces[0].id)

    const todayText = moment().format('MM/DD/YYYY')
    const tomorrowText = moment().add(1, 'days').format('MM/DD/YYYY')

    cy.get('[data-testid="booking-form"] .react-datepicker-wrapper input').first().type(todayText + '{enter}')
    cy.get('[data-testid="booking-form"] .react-datepicker-wrapper input').eq(1).type(tomorrowText + '{enter}')
  }

  it('enables the submit button if the form is valid', () => {
    fillAllTheInputs()

    cy.get('[data-testid="form-submit-button"').should('be.enabled')
  })

  it('clears check-out input if check-in input is changed', () => {
    fillAllTheInputs()

    cy.get('[data-testid="booking-form"] .react-datepicker-wrapper input').first().type(moment().format('MM/DD/YYYY') + '{enter}')
    cy.get('[data-testid="booking-form"] .react-datepicker-wrapper input').eq(1).should('have.value', '')
  })

  it('calculates the price based on selected input options', () => {
    fillAllTheInputs()

    cy.get('[data-testid="form-price-message"]').should('have.html', `<b>$${availablePlaces[0].pricePerNight}</b> (1 night)`)
  })
})
