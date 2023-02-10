import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './js/currencyExchanger';

// Business Logic

async function getExchangeRates() {
  const response = await CurrencyExchange.getExchangeRates()
  if (response.result === 'success') {
    printExchangeRates(response);
  } else {
    printError(response);
  }
}

async function getExchangeAmount(amount, currency) {
  const response = await CurrencyExchange.getExchangeAmount()
  if (response.result === 'success') {
    let convRate = response.conversion_rates[currency];
    console.log(convRate);
    printExchangeAmount(amount, convRate);
  } else {
    printError(response);
  }
}

// UI Logic
function printExchangeRates(response) {
  response.supported_codes.forEach(element => {
    console.log(element[0]);
  });
  let availableCurrencies = document.getElementById('currencySelection');
  response.supported_codes.forEach(element => {
    let option = document.createElement('option');
    option.innerText = element[0];
    availableCurrencies.append(option);
  });
}

function printExchangeAmount(amount, convRate) {
  document.querySelector('#showResponse').innerText = `At the current exchange rate, ${amount} USD is: ${amount * 5} & ${amount * convRate}`;
  console.log(convRate);
}

function printError(error) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the exchange rate: ${error}`;
}

function getRates(event) {
  event.preventDefault();
  getExchangeRates();
}

function getCurrency() {
  return
}

function handleFormSubmission(event) {
  event.preventDefault();
  const amount = document.querySelector('#amount').value;
  let currency = getCurrency();
  document.querySelector('#amount').value = null;
  getExchangeAmount(amount, currency);
}

window.addEventListener("load", function () {
  document.querySelector('#rates').addEventListener("submit", getRates);
  document.querySelector('#amountForm').addEventListener("submit", handleFormSubmission);
});