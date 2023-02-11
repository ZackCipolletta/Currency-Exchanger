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
    const response = await CurrencyExchange.getSupportedCurrencies();
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

async function latestExchangeValue() {
  if (sessionStorage.getItem('latestExchangeValues')) {
    const response = JSON.parse(sessionStorage.getItem('latestExchangeValues'));
    currentValuesTable(response);
    document.getElementById('showResponse').innerText = "latest values is coming from cache";
  } else {
    const response = await CurrencyExchange.latestExchangeValue();
    if (response.result === 'success') {
      sessionStorage.setItem('latestExchangeValues', JSON.stringify(response));
      currentValuesTable(response);
      document.getElementById('showResponse').innerText = "latest values is not coming from cache damnit";
    } else {
      printError(response);
    }
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
  document.querySelector('#showResponse').innerText = `At the current exchange rate, ${amount} ${currencyFrom} is: ${(Math.round((convertedResult*100)*100)/100).toFixed(2)} ${currencyTo}`;
}

function printError(error) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the exchange rate: ${error}`;
  console.log(error.status);
}

function currentValuesTable(response) {
  let latestRatesArr = ['EUR', 'GBP', 'JPY'];
  latestRatesArr.forEach(element => {
    document.querySelector(`#${element}`).innerText = `${response.conversion_rates[`${element}`]}`;
    convertedAmountFill(element);
  });
}

function convertedAmountFill(currency) {
  console.log(currency);
  let convRate = document.querySelector(`#${currency}`).innerText;
  document.querySelector(`#${currency}x100`).innerText = (Math.round((convRate*100)*100)/100).toFixed(2);
}

function getCurrencies(event) {
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
  // document.querySelector('#rates').addEventListener("submit", getRates); // <-- change to onload instead of submit once completed.

  document.querySelector('#amountForm').addEventListener("submit", handleFormSubmission);

  document.getElementById('currency0Selection').addEventListener('change', updateConvMessage);

});
window.addEventListener('load', getCurrencies);
window.addEventListener('load', latestExchangeValue);
