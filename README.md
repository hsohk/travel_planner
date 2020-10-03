# Webpack Project

Tools which are used in this project

- Instruction
    - This Project is the part of Udacity Nano Degree.
    - This web app is used HTML/CSS/Javascript/Node.js/Express/Webpack
- Usage
    - npm i
    - create .env file in root directory
    - add API_KEY in .env file
    ```
    GEO_ID = Your ID of Geonames
    WEATHER_KEY = Your API KEY of Weatherbit
    IMG_KEY = Your API KEY of Pixabay
    ```
    - `npm run build-dev` for development
    - `npm run build-prod` for production
    - `npm run test` for test
    - `Add`/`Edit`/`Delete` were implemented
    - Server support 
        - GET '/all'
        - POST '/del', 'add', 'edit'
- Extra Features
    - All data will be saved in server.
    - Allow the user to add additional trips
    - Allow the user to remove the trip.
    - Use Local Storage to save the data so that when they close, then revisit the page, their information is still there.