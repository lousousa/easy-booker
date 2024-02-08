# Easy Booker

[![react](https://badges.aleen42.com/src/react.svg)](https://badges.aleen42.com/src/react.svg)
[![typescript](https://badges.aleen42.com/src/typescript.svg)](https://badges.aleen42.com/src/typescript.svg)
[![vite](https://badges.aleen42.com/src/vitejs.svg)](https://badges.aleen42.com/src/vitejs.svg)
[![eslint](https://badges.aleen42.com/src/eslint.svg)](https://badges.aleen42.com/src/eslint.svg)

## Introduction

Easy Booker is a streamlined CRUD (Create, Read, Update, Delete) mobile-first web application designed specifically for managing hotel bookings. With a focus on simplicity and efficiency, it offers users the ability to create, list, read, update, and remove bookings directly from their browser, ensuring data persistence in the browser without the need for a backend.

## Preview

![easy-booker](https://github.com/lousousa/easy-booker/assets/2921281/703037de-0573-414f-821c-947ab3fb6c60)

## Features

- **Create Bookings**: Add new hotel bookings with ease.
- **Read Bookings**: View the list of existing bookings.
- **Update Bookings**: Modify details of existing bookings.
- **Delete Bookings**: Remove bookings no longer needed.
- **Local Data Storage**: Uses localForage to store booking data locally in the browser.
- **Mobile-First Design**: Optimized for a superior mobile user experience.

## Tech Stack

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A modern frontend build tool that significantly improves the development experience.
- **TypeScript**: Adds static type definitions to JavaScript to improve development and maintainability.
- **Styled Components**: Utilized for styling React components with tagged template literals.
- **Cypress**: An end-to-end testing framework designed for modern web applications.
- **ESLint**: A pluggable linting utility for JavaScript and JSX.
- **Local Forage**: A fast and simple storage library for managing data in the browser.

## Architecture

Easy Booker is structured around reusable components, allowing for efficient development and maintenance. It embodies the best practices of clean code, ensuring a scalable and efficient application. This front-end focused architecture ensures that all functionalities are executed client-side, with no dependency on a backend infrastructure.

## Getting Started

### Prerequisites

Before you begin, ensure you have the latest version of Node.js installed on your system to run the project smoothly.

### Installation

1. Clone the repository:
```bash
git clone https://github.com/lousousa/easy-booker.git
````

2. Navigate to the project directory:
```bash
cd easy-booker
````

3. Install dependecies:
```bash
npm install
````

4. Start the development server:
```bash
npm run dev
```

This command will start the application in development mode with hot-reloading enabled.

## Testing

Easy Booker utilizes Cypress for end-to-end testing to ensure the application functions correctly and provides a seamless user experience. To run the Cypress tests, follow these steps:

1. Open a terminal in the project's root directory.
2. Start the application (if it's not already running) by executing:
```bash
npm run dev
```
3. Open Cypress with the following command:
```bash
npx cypress open
```
4. Once Cypress launches, you'll see a list of test files. Click on a test file to run it, or run all tests by clicking on the "Run all specs" button.
Cypress will execute the tests and display the results in real-time. You can observe each step of the tests through the Cypress Test Runner, which provides a detailed view of the tests as they run, including any assertions, commands, and the application's state at each step.

## Writing Tests

If you wish to contribute by writing additional tests, please ensure your tests are clear, concise, and cover both happy and edge case scenarios. Add your test files to the cypress/integration directory, following the naming convention and structure of existing tests.

For more information on writing tests with Cypress, refer to the [Cypress Documentation](https://docs.cypress.io/
).

## Contribution

We welcome contributions to Easy Booker! If you have suggestions or improvements, please fork the repository and submit a pull request.
