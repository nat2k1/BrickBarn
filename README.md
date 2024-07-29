# The Brick Barn

The Brick Barn is an e-commerce web application built using React and Firebase. This platform allows users to browse a catalog of LEGO bricks, add them to a shopping cart, and proceed to checkout. The project incorporates features like user authentication, discount codes, and dynamic cart updates.

## Features

- **Product Catalog**: Browse and filter LEGO bricks by dimensions and color categories.
- **Shopping Cart**: Add items to the cart, adjust quantities, and view the total price with tax and discounts.
- **Checkout Process**: Complete purchases with a simulated payment process.
- **Discount Codes**: Apply discount codes at checkout for savings.
- **User Authentication**: Secure user sign-up and login.

## Getting Started

### Prerequisites

- Node.js (version 14.x or later)
- npm (version 6.x or later)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/nat2k1/BrickBarn.git
   cd BrickBarn
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Add Firebase configuration:
   - Create a `config` folder under the `src` directory.
   - Add your `firebaseConfig.js` file with Firebase configuration details.

### Running the App

To start the application locally:

```sh
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

### Running Tests

To run tests:

```sh
npm test
```

### Building for Production

To build the app for production:

```sh
npm run build
```

The build outputs to the `build` folder and can be served by any static hosting service.

## Project Structure

- **/src**: Contains all the source code, including components, hooks, and configuration files.
- **/src/components**: React components like `ProductList`, `Cart`, `Checkout`, `Navbar`, etc.
- **/src/hooks**: Custom React hooks, including `useCart` and `useFetchProducts`.
- **/public**: Publicly accessible files, such as `index.html`.

## Technologies Used

- **React**: Front-end library for building the user interface.
- **Firebase**: Backend-as-a-Service for database, authentication, and hosting.
- **Bootstrap**: CSS framework for responsive and modern web design.

## Documentation

- [Revised Specification](./docs/SPECIFICATION.md)
- [Workload Distribution Report](./docs/WORKLOAD_DISTRIBUTION.md)
- [Version History](./docs/VERSION_HISTORY.md)
- [Use-Case Diagram](./diagrams/USE_CASE_DIAGRAM.txt)
- [Class Diagram](./diagrams/CLASS_DIAGRAM.txt)
- [State Diagram](./diagrams/STATE_DIAGRAM.txt)
- [Sequence Diagram](./diagrams/SEQUENCE_DIAGRAM.txt)


## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## Acknowledgments

- [Create React App](https://github.com/facebook/create-react-app)
- [Firebase](https://firebase.google.com/)
- [Bootstrap](https://getbootstrap.com/)


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
