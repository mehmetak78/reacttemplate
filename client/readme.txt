- Install React Snippets Plugin to Webstorm
    - In Plugins, search for React and find React Snippets and install
    - Now you can see the shortcuts in Editor/Live Templates/React
        - You can check all from "Preferences/Editor/Live Templates/React"
        - Some Samples :
            pt: MyComponent.Proptypes
            rcc: Creates a React component class with ES6 module system
            rccp: Creates a React component class with PropTypes and ES6 module system
            rcfc: Creates a React component class with PropTypes and all lifecycle methods and ES6 module system
            rrc: Creates a React component class connected to redux
            rsc: Creates a stateless React component without PropTypes and ES6 module system
            rscp: Creates a stateless React component with PropTypes and ES6 module system

- Create a react app
	- By using the command prompt
	    $ createreactapp reacttemplate
	- By using the Webstorm
	    File/New/Project/ReactApp
- Start the application
    - $ cd reacttemplate
    - $ npm start
- See the application on browser
    - http://localhost:3000/
- Create the "redux"
    - $ npm install redux, react-redux, react-router-dom, prop-types, axios, redux-thunk, lodash, jwt-decode
    - Create store.js
    - Create rootReducer.js
        - Create sampleReducer.js
        - Create userReducer.js
        - Create errorReducer.js
- Add Proxy for calling the api on the same server.
      "proxy": "http://localhost:3001",

