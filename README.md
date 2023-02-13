# Global Currency Exchanger

#### A website utilizing API calls, JavaScript classes, loops, branching and user input.

#### By Zachary Cipolletta

## Technologies Used

* CSS
* HTML
* JavaScript
* Node.js
* Jest
* Webpack
* npm
* ESLint

## Description
This website uses JS classes and static methods to make API calls to a currency exchange API. The currencies which are currently supported by the API are then saved in sesionStorage and used to populate the dropdown boxes.  The site also uses session storage to store the latest conversion rates from USD for all currencies currently supported.

Each time a seleciton of which currencies to exchange to and from is made and the amount to exchange has been entered, the an API call is made once the submit button is clicked. The converted amount is then populated on the page using the API response.  I also could have used the information stored in sessionStorage to perform the calculation uisng the conversion to USD from one currency then converting again from USD to the second selected currency, but I found it more interesting to use an API call for each conversion as this would be the most up to date information.

Future functionality I would like to include would be a functino that checks the amount of time that has passed since information was added to sessionStorage.  Once this has been added, I would like to use the information stored in sessionStorage for each conversion to minimize the number of API calls necessary and then refresh the conversion values for all currencies stored in sessionStorage after a specified perio do of time inorder to ensure the page is not using stale data.

## Setup/Installation Requirements

* Clone repository to your desktop
* Navigate to the top level of the directory
* Install all packages with $ npm install.
* Build the project using webpack with $ npm run build
* If you wish to lint JS files in the src folder, run $ npm run lint
* Start a development server with $ npm run start
* Navigate to https://www.exchangerate-api.com/, enter in your Email address to get a free API key
* create a file named .env in the top level of the project directory.
* In the .env file, add "API_KEY={YOUR API KEY}" where YOUR API KEY is the API key obtained from the website.

## Known Bugs

* no known bugs at this time

## License
MIT

Copyright (c) 2/12/2023 Zachary Cipolletta
