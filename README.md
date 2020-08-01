##  Description

An app that enables hangers from all over the world to discover and share zones
in which to hang 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Bootstrapped, but there is some extra stuff in there to make it play nicely with firebase, etc.

## Installation

1. Install yarn if you haven't already done so

```
npm install -g yarn
```

2. Install the firebase CLI

```
npm install -g firebase-tools
```

3. Clone and install deps

```
git clone git@github.com:hangforever/hangzone.git
cd hangzone
yarn
```

4. Add `.env` file to root dir

This file is in .gitignore so it will not be tracked

`.env`
```
REACT_APP_API_KEY=AIzaSyCRi1Xpc3e0HR9g66H0Mtkn8VzvTmU3U4Y 
REACT_APP_AUTH_DOMAIN=hangzone-494fc.firebaseapp.com
REACT_APP_DATABASE_URL=https://hangzone-494fc.firebaseio.com
REACT_APP_PROJECT_ID=hangzone-494fc
REACT_APP_STORAGE_BUCKET=hangzone-494fc.appspot.com
REACT_APP_MESSAGING_SENDER_ID=376999931997
REACT_APP_APP_ID=1:376999931997:web:17cedeae05969d116dddb4
SASS_PATH=node_modules:src
```

## Development

### `yarn dev`

Runs the app in the development mode.<br />
The CLI will tell you what port it's running locally on, if it doesn't already invasively open a tab on you.
(help I'm being acosted by react-script tho)

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

- TODO: find out how this works, lol

### Adding static assets (images, etc)

- You can put a static assets in `src` and `import` it.
- You can put any static asset in the `public` directory and reference the path to it.

### Resolution

- 'src' directory is added to paths so relative imports like './components/MyComponent' or '../components/MyComponent' can just be 'components/MyComponent'

## Deployments

### `firebase deploy`

This will build any assets necessary and then upload them to firebase.


## Other scripts

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## On MobX

This application uses mobx for state management. Since the project was bootstrapped with create-react-app and CRA doesn't support decorators, we are using this guide for creating our stores:
[https://mobx.js.org/best/decorators.html](https://mobx.js.org/best/decorators.html)

## More Info

- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
- [Firebase Webapp Guide](https://firebase.google.com/docs/web/setup)
- [Installing the Firebase CLI](https://firebase.google.com/docs/web/setup#install-cli-deploy)