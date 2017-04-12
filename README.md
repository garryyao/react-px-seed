# React Px Seed

An React-Redux seed app match and mix with Predix UI Polymer web components.

### Features
- ✓ Polymer Web Component in form of high-order React Component, use props like native React Component.
- ✓ Passing down props directly to the web component as properties instead of attributes, it's faster and safer, if you really need to pass attributes add a dollar sign ($) just like [in Polymer](https://www.polymer-project.org/1.0/docs/devguide/data-binding).
- ✓ **Props in, events out**, use Polymer's [change notification](https://www.polymer-project.org/1.0/docs/devguide/data-system#custom-change-notification-events) events for up-ward data flow, fully respect React's unidirectional data-flow.
- ✓ Support content distribution to web component via `this.props.children`.
- ✓ Work with the standard [ref API](https://facebook.github.io/react/docs/more-about-refs.html) for accessing the rendered custom DOM element.
- ✓ Work with Hot Module Replacement ([HMR](https://webpack.github.io/docs/hot-module-replacement.html)) /w [React Hot Loader](http://gaearon.github
- ✓ Work with Polymer's tooling to create bundled/unbundled [HTML Imports](https://www.html5rocks.com/en/tutorials/webcomponents/imports/).
- ▢ Support for Polymer/Web Component [lifecycle callbacks](https://www.polymer-project.org/1.0/docs/devguide/registering-elements#lifecycle-callbacks).

### Directory Layout

```shell
├── components/                 # Shared or generic UI components
│   ├── WebComponent/                 # Polymer Web Component Adapter
│   ├── Layout/                 # Layout component
│   ├── TimeSeriesCard/                   # Predix Card Component
│   └── ...                     # etc.
├── node_modules/               # 3rd-party libraries and utilities
├── src/                        # Application source code
│   ├── home/                   # Home page
│   ├── history.js              # Handles client-side navigation
│   ├── main.js                 # <== Application entry point <===
│   ├── router.js               # Handles routing and data fetching
│   ├── routes.json             # This list of application routes
│   └── store.js                # Application state manager (Redux)
├── public/                     # Static files such as favicon.ico etc.
│   ├── elements/                   # The folder for pre-built Polymer web components
│   ├── dist/                   # The folder for compiled output
│   ├── favicon.ico             # Application icon to be displayed in bookmarks
│   ├── robots.txt              # Instructions for search engine crawlers
│   └── ...                     # etc.
├── test/                       # Unit and integration tests
├── tools/                      # Utility and helper classes
└── package.json                # The list of project dependencies and NPM scripts
```


### Getting Started

**Step 1**. Make sure that you have [Node.js](https://nodejs.org/) v6 or newer and
[Yarn](https://yarnpkg.com/) installed on your development machine.

**Step 2**. Clone this repository

```shell
$ cd react-px-seed
$ yarn install                  # Install project dependencies listed in package.json
```

**Step 3**. Compile and launch your app by running:

```shell
$ yarn start                    # Compiles the app and opens it in a browser with "live reload"
```

You can also test your app in release (production) mode by running `yarn start -- --release` or
with HMR and React Hot Loader disabled by running `yarn start -- --no-hmr`. The app should become
available at [http://localhost:3000/](http://localhost:3000/).


### How to Test

The unit tests are powered by [chai](http://chaijs.com/) and [mocha](http://mochajs.org/).

```shell
$ yarn lint                     # Check JavaScript and CSS code for potential issues
$ yarn test                     # Run unit tests. Or, `yarn run test:watch`
```

### How to Build and Deploy
If you need to build the project, simply run:

```shell
$ yarn build                    # Compiles the app into the /public/dist folder
$ cf push [your-app-name]                    # Push to Predix Cloud Foundry
```