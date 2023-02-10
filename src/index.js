import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './js/currencyExchanger';

// Business Logic

async function getExchangeRates() { // function is replaced by IIFE in hanldeFormSubmision() below.
  const response = await CurrencyExchange.getExchangeRates()
  if (response.result === 'success') {
    printExchangeRates(response);
  } else {
    printError(response);
  }
}

// UI Logic
function printExchangeRates(response) {
  response.supported_codes.forEach(element => {
    console.log(element[0]);
  });
}

// function printExchange(amount) {
//   document.querySelector('#showResponse').innerText = `At the current exchange rate, ${amount} USD is: .`;
// }

function printError(error) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the exchange rate: ${error}`;
}

function getRates(event) {
  event.preventDefault();
  getExchangeRates();
}

function handleFormSubmission(event) {
  event.preventDefault();
  const amount = document.querySelector('#amount').value;
  document.querySelector('#amount').value = null;
  getExchangeRates(amount);
}

window.addEventListener("load", function () {
  document.querySelector('#rates').addEventListener("submit", getRates);
  document.querySelector('#amountForm').addEventListener("submit", handleFormSubmission);
});