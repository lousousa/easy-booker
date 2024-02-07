import { availablePlaces } from '../../src/data-manager'
import moment from 'moment'

describe('Workflow spec', () => {
  beforeEach(() => {
    cy.visit( 'http://127.0.0.1:5173/ ')

    cy.window().then(win => {
      win.localForage = require('localforage')
      win.localForage.clear()
    })
  })

  const fillAllTheInputs = () => {
    cy.get('[data-testid="form-place-select"]').select(availablePlaces[0].id)

    const todayText = moment().format('MM/DD/YYYY')
    const tomorrowText = moment().add(1, 'days').format('MM/DD/YYYY')

    cy.get('[data-testid="booking-form"] .react-datepicker-wrapper input').first().type(todayText + '{enter}')
    cy.get('[data-testid="booking-form"] .react-datepicker-wrapper input').eq(1).type(tomorrowText + '{enter}')

    return { todayText, tomorrowText }
  }

  const createBooking = () => {
    fillAllTheInputs()
    cy.get('[data-testid="booking-form"]').submit()
  }

  it('should correctly display the page title in the document head', () => {
    cy.get('[data-testid="page-title"]').should('have.text', 'Easy Booker')
  })

  it('should disable the submit button when form inputs are empty', () => {
    cy.get('[data-testid="form-submit-button"').should('be.disabled')
  })

  it('should populate the select dropdown with available places options', () => {
    availablePlaces.forEach(option => {
      cy.get('[data-testid="form-place-select"]').should('contain', option.title)
    })
  })

  it('should enable the submit button when all form fields are valid', () => {
    fillAllTheInputs()

    cy.get('[data-testid="form-submit-button"').should('be.enabled')
  })

  it('should reset the check-out date input when the check-in date is altered', () => {
    const { todayText } = fillAllTheInputs()

    cy.get('[data-testid="booking-form"] .react-datepicker-wrapper input').eq(0).type(todayText + '{enter}')
    cy.get('[data-testid="booking-form"] .react-datepicker-wrapper input').eq(1).should('have.value', '')
  })

  it('should accurately calculate the total price based on the selections made in the form inputs', () => {
    fillAllTheInputs()

    cy.get('[data-testid="form-price-message"]').should('have.html', `<b>$${availablePlaces[0].pricePerNight}</b> (1 night)`)
  })

  it('should only show the bookings list when there is at least one booking present', () => {
    cy.get('[data-testid="booking-list"]').should('not.exist')

    createBooking()

    cy.get('[data-testid="booking-list"]').should('exist')
  })

  it('should save a new booking to the system when the save button is clicked', () => {
    createBooking()

    cy.window()
      .then(win => win.localForage.getItem('bookings'))
      .then((bookings) => {
        expect(bookings).to.have.lengthOf(1)
      })
  })

  it('should include both edit and remove buttons within each booking item displayed on the list', () => {
    createBooking()

    cy.get('[data-testid="booking-list"] [data-testid="item-edit-button"]').should('have.text', 'Edit')
    cy.get('[data-testid="booking-list"] [data-testid="item-remove-button"]').should('have.text', 'Remove')
  })

  it('should open the booking edit modal when the edit button is clicked for a booking', () => {
    cy.get('[data-testid="edit-modal"]').should('not.exist')

    createBooking()

    cy.get('[data-testid="booking-list"] [data-testid="item-edit-button"]').click()
    cy.get('[data-testid="edit-modal"]').should('exist')
  })

  it('should apply and reflect changes to the booking details in the list upon saving in the edit modal', () => {
    createBooking()

    cy.get('[data-testid="booking-list"] [data-testid="item-text-title"]').should('have.text', availablePlaces[0].title)
    cy.get('[data-testid="booking-list"] [data-testid="item-edit-button"]').click()
    cy.get('[data-testid="edit-modal"] [data-testid="form-place-select"]').select(1)
    cy.get('[data-testid="edit-modal"] [data-testid="booking-form"]').submit()
    cy.get('[data-testid="booking-list"] [data-testid="item-text-title"]').should('have.text', availablePlaces[1].title)
  })

  it('should display a confirmation modal when the remove button is clicked for a booking', () => {
    cy.get('[data-testid="confirmation-modal"]').should('not.exist')

    createBooking()

    cy.get('[data-testid="booking-list"] [data-testid="item-remove-button"]').click()
    cy.get('[data-testid="confirmation-modal"]').should('exist')
  })

  it('should retain the specified booking in the list if the removal is not confirmed in the confirmation modal', () => {
    createBooking()

    cy.get('[data-testid="booking-list"] [data-testid="item-remove-button"]').click()
    cy.get('[data-testid="confirmation-modal"] [data-testid="modal-cancel-button"]').click()

    cy.window()
      .then(win => win.localForage.getItem('bookings'))
      .then((bookings) => {
        expect(bookings).to.have.lengthOf(1)
      })
  })

  it('should delete the specified booking from the list upon confirmation in the removal modal', () => {
    createBooking()

    cy.get('[data-testid="booking-list"] [data-testid="item-remove-button"]').click()
    cy.get('[data-testid="confirmation-modal"] [data-testid="modal-confirm-button"]').click()

    cy.window()
      .then(win => win.localForage.getItem('bookings'))
      .then((bookings) => {
        expect(bookings).to.have.lengthOf(0)
      })
  })
})
