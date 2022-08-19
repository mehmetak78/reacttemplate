npm run server

Or :
    npm run dev
        - runs the server
        - runs the client
--------------- GENERAL NOTES ---------------------------------------------

- You can use error handling in Warbler sample
    - warbler-server/handlers/error.js
- You can use async functions instead of promises like in warbler
    See : https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9
- You can use own middleware instead of Passport like in Warbler
    - warbler-server/middleware/auth.js

--------------- SECTION 2 - BASIC SETUP ---------------------------------------------

- Install Node
    - https://nodejs.org/en/
- Use Mongo (mlab)
    - https://mlab.com/home?newLogin=1
        mehmetak78/p*******
    - Create a New Database
        - +Create New / Amazon Web Services / Sandobox
        - DatanseName : devconnecttormak
        - Create database user:
            mehmet/m*******
    - Database connection string will be:
        mongodb://<dbuser>:<dbpassword>@ds237610.mlab.com:37610/devconnectormak
- Create Applicatin Folder
    - devconnector
- npm init
    MEHMETs-MBP:devconnector mehmetak$ npm init
- Install dependencies
    MEHMETs-MBP:devconnector mehmetak$ npm install express mongoose passport passport-jwt jsonwebtoken body-parser bcryptjs validator gravatar
- Dev dependencies
    MEHMETs-MBP:devconnector mehmetak$ npm install -D nodemon
- server.js
- Change package.json
      "scripts": {
        "start": "node server.js",
        "server": "nodemon server.js"
      },
- Run the server
    MEHMETs-MBP:devconnector mehmetak$ npm run server
- Create configuratation files
    - Create a folder "config"
    - Create a file "keys.js"
        module.exports = {
            mongoURI:
                "mongodb://mehmet:mehmet@ds237610.mlab.com:37610/devconnectormak",
            secretOrKey: "secret"
        };
- Connect to MongoDB
    - make changes in server.js
- Routes
    - Create directory "routes"
    - Create directory "routes/api"
    - Create files inside directory "routes/api"
        - users.js
        - profile.js
        - posts.js
- Using git
    - Create a .gitignore file
        /node_modules
        package-lock.json
    - MEHMETs-MBP:devconnector mehmetak$ git init
    - MEHMETs-MBP:devconnector mehmetak$ git add .
    - MEHMETs-MBP:devconnector mehmetak$ git commit -am "Initial Express Server with Route Files"


--------------- SECTION 3 - USER API Routes & JWT Authentication ---------------------------------------------

- Create the "models" directory
- Creating the User Model
    - Create a file "User.js" in "models" directory.
- Register user
    - **** IMPORTANT : The sample in Warbler is better since it uses async with await instead of promise
        - see : https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9
    - make changes in routes/users.js
    - for avatar use gravatar
        https://github.com/emerleite/node-gravatar
- Login user
    - for JWT key use config file keys.js
- Authentication
    - Use passport (not selected for this application. It is included just for sample from the lecture)
            https://github.com/themikenicholson/passport-jwt
        - Passport is the main authentication module. You can use google etc. with it.
        - here we use Passport JWT
            https://github.com/themikenicholson/passport-jwt
        - Write the passport strategy in /middleware/passport.js
    - Use custom made middleware like in Warbler ( I have added this one to this application)
        ./middleware/auth.js
    - While sending GET request in POSTMAN
        - write Headers Parameter, with the token you got while signing in.
            Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMGIyODVjMGM5MGYwMDVhMzhhNzAzMCIsIm5hbWUiOiJNZWhtZXQgQWsiLCJhdmF0YXIiOiIvL3d3dy5ncmF2YXRhci5jb20vYXZhdGFyL2RiM2RmZDE4MTU4MDM0NzU2OGRiNjJiMDU0YjNmNWM2P3M9MjAwJnI9cGcmZD1tbSIsImlhdCI6MTUyNzQ2MTYyOCwiZXhwIjoxNTI3NDY1MjI4fQ.yXv-W3Nb_w5m_k1RBEOuelpZYRu7iOP9igeNpvL2uwM
- Validation
    - Use the following module for validating strings
        https://github.com/chriso/validator.js/
    - create a directory for validation (./validaton)
        - create files under it ex: register.js, login.js
        - create an isEmpty function inside an is-empty.js file

For Creating a new model, route, validation, ex: post
    - Create a model
        - Create model in ./models/Post.js
    - Create route
        - Create route in "./routes/api/routePost.js"
    - Create route handler
        - Create route handler in "./routes/handlers/routeHandlerPost.js"
    - Create validation
        - Create a folder for validations of Post
        - Create validation in ./validations/validatePost/validatePost.js


