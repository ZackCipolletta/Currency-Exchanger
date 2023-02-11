import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './js/currencyExchanger';

// Business Logic

async function getSupportedCurrencies() {
  if (sessionStorage.getItem('supportedCurrencies')) {
    const response = JSON.parse(sessionStorage.getItem('supportedCurrencies'));
    dropDownsToPopulate(response);
    document.getElementById('showResponse').innerText = "this is coming from cache";
  } else {
    const response = await CurrencyExchange.getSupportedCurrencies()
    if (response.result === 'success') {
      sessionStorage.setItem('supportedCurrencies', JSON.stringify(response));
      dropDownsToPopulate(response);
      document.getElementById('showResponse').innerText = "this is not coming from cache damnit";

    } else {
      printError(response);
    }
  }
}


async function getExchangeAmount(amount, currencyFrom, currencyTo) {
  const response = await CurrencyExchange.getExchangeAmount(currencyFrom, currencyTo, amount);
  if (response instanceof Error) {
    printError(response);
  } else {
    let convertedResult = response.conversion_result;
    printExchangeAmount(amount, currencyFrom, convertedResult, currencyTo);
  }
}

// UI Logic
function getCurrencyCodes(response, dropDown) {
  response.supported_codes.forEach(element => {
    let option = document.createElement('option');
    option.innerText = element[0];
    dropDown.append(option);
  });
}

function dropDownsToPopulate(response) {
  let availableFromCurrencies = document.getElementById('currency0Selection');
  let availableToCurrencies = document.getElementById('currency1Selection');
  getCurrencyCodes(response, availableFromCurrencies);
  getCurrencyCodes(response, availableToCurrencies);
}

function printExchangeAmount(amount, currencyFrom, convertedResult, currencyTo) {
  document.querySelector('#showResponse').innerText = `At the current exchange rate, ${amount} ${currencyFrom} is: ${convertedResult} ${currencyTo}`;
}

function printError(error) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the exchange rate: ${error}`;
  console.log(error.status);
}

function getRates(event) {
  event.preventDefault();
  getSupportedCurrencies();
}

function updateConvMessage() {
  document.getElementById('currencyFrom').innerText = `of ${getCurrency(0)}`;
}

function getCurrency(selection) {
  let currency = document.getElementById(`currency${selection}Selection`).value;
  return currency;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const amount = document.querySelector('#amount').value;
  let currencyFrom = getCurrency(0); // being a bit cheeky here by using 0 and 1 in place as arguments instaed of strings as they should be.  This allows me to bypass having to create a seperate function to perform the exact same action on two different DOM elements.  I coul dnot find another workaround.
  let currencyTo = getCurrency(1);
  document.querySelector('#amount').value = null;
  getExchangeAmount(amount, currencyFrom, currencyTo);
}

window.addEventListener("load", function () {
  // document.querySelector('#rates').addEventListener("submit", getRates); // <-- chkange to onload instead of submit once completed.

  document.querySelector('#amountForm').addEventListener("submit", handleFormSubmission);
  // document.getElementById('availableCurrencies').addEventListener('change', getCurrency) <-- use to update DOM, don't use to call API as this will fire for each currency option if someone scrolls through using arrow keys.
  document.getElementById('currency0Selection').addEventListener('change', updateConvMessage);

});
window.addEventListener('load', getRates);
