import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './js/currencyExchanger';

// Business Logic

async function getExchangeRates() {
  const response = await theResponse; //await CurrencyExchange.getExchangeRates() <-- gets called on page load.
  if (response.result === 'success') {
    dropDownsToPopulate(response);
  } else {
    printError(response);
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
  getExchangeRates();
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
  console.log(currencyFrom);
  console.log(currencyTo);
  getExchangeAmount(amount, currencyFrom, currencyTo);
}

window.addEventListener("load", function () {
  // document.querySelector('#rates').addEventListener("submit", getRates); // <-- chkange to onload instead of submit once completed.

  document.querySelector('#amountForm').addEventListener("submit", handleFormSubmission);
  // document.getElementById('availableCurrencies').addEventListener('change', getCurrency) <-- use to update DOM, don't use to call API as this will fire for each currency option if someone scrolls through using arrow keys.
});
window.addEventListener('load', getRates);

let theResponse = {
  "result": "success",
  "documentation": "https://www.exchangerate-api.com/docs",
  "terms_of_use": "https://www.exchangerate-api.com/terms",
  "supported_codes": [
    [
      "PEEN",
      "UAE Dirham"
    ],
    [
      "AFN",
      "Afghan Afghani"
    ],
    [
      "ALL",
      "Albanian Lek"
    ],
    [
      "AMD",
      "Armenian Dram"
    ],
    [
      "ANG",
      "Netherlands Antillian Guilder"
    ],
    [
      "AOA",
      "Angolan Kwanza"
    ],
    [
      "ARS",
      "Argentine Peso"
    ],
    [
      "AUD",
      "Australian Dollar"
    ],
    [
      "AWG",
      "Aruban Florin"
    ],
    [
      "AZN",
      "Azerbaijani Manat"
    ],
    [
      "BAM",
      "Bosnia and Herzegovina Convertible Mark"
    ],
    [
      "BBD",
      "Barbados Dollar"
    ],
    [
      "BDT",
      "Bangladeshi Taka"
    ],
    [
      "BGN",
      "Bulgarian Lev"
    ],
    [
      "BHD",
      "Bahraini Dinar"
    ],
    [
      "BIF",
      "Burundian Franc"
    ],
    [
      "BMD",
      "Bermudian Dollar"
    ],
    [
      "BND",
      "Brunei Dollar"
    ],
    [
      "BOB",
      "Bolivian Boliviano"
    ],
    [
      "BRL",
      "Brazilian Real"
    ],
    [
      "BSD",
      "Bahamian Dollar"
    ],
    [
      "BTN",
      "Bhutanese Ngultrum"
    ],
    [
      "BWP",
      "Botswana Pula"
    ],
    [
      "BYN",
      "Belarusian Ruble"
    ],
    [
      "BZD",
      "Belize Dollar"
    ],
    [
      "CAD",
      "Canadian Dollar"
    ],
    [
      "CDF",
      "Congolese Franc"
    ],
    [
      "CHF",
      "Swiss Franc"
    ],
    [
      "CLP",
      "Chilean Peso"
    ],
    [
      "CNY",
      "Chinese Renminbi"
    ],
    [
      "COP",
      "Colombian Peso"
    ],
    [
      "CRC",
      "Costa Rican Colon"
    ],
    [
      "CUP",
      "Cuban Peso"
    ],
    [
      "CVE",
      "Cape Verdean Escudo"
    ],
    [
      "CZK",
      "Czech Koruna"
    ],
    [
      "DJF",
      "Djiboutian Franc"
    ],
    [
      "DKK",
      "Danish Krone"
    ],
    [
      "DOP",
      "Dominican Peso"
    ],
    [
      "DZD",
      "Algerian Dinar"
    ],
    [
      "EGP",
      "Egyptian Pound"
    ],
    [
      "ERN",
      "Eritrean Nakfa"
    ],
    [
      "ETB",
      "Ethiopian Birr"
    ],
    [
      "EUR",
      "Euro"
    ],
    [
      "FJD",
      "Fiji Dollar"
    ],
    [
      "FKP",
      "Falkland Islands Pound"
    ],
    [
      "FOK",
      "Faroese Króna"
    ],
    [
      "GBP",
      "Pound Sterling"
    ],
    [
      "GEL",
      "Georgian Lari"
    ],
    [
      "GGP",
      "Guernsey Pound"
    ],
    [
      "GHS",
      "Ghanaian Cedi"
    ],
    [
      "GIP",
      "Gibraltar Pound"
    ],
    [
      "GMD",
      "Gambian Dalasi"
    ],
    [
      "GNF",
      "Guinean Franc"
    ],
    [
      "GTQ",
      "Guatemalan Quetzal"
    ],
    [
      "GYD",
      "Guyanese Dollar"
    ],
    [
      "HKD",
      "Hong Kong Dollar"
    ],
    [
      "HNL",
      "Honduran Lempira"
    ],
    [
      "HRK",
      "Croatian Kuna"
    ],
    [
      "HTG",
      "Haitian Gourde"
    ],
    [
      "HUF",
      "Hungarian Forint"
    ],
    [
      "IDR",
      "Indonesian Rupiah"
    ],
    [
      "ILS",
      "Israeli New Shekel"
    ],
    [
      "IMP",
      "Manx Pound"
    ],
    [
      "INR",
      "Indian Rupee"
    ],
    [
      "IQD",
      "Iraqi Dinar"
    ],
    [
      "IRR",
      "Iranian Rial"
    ],
    [
      "ISK",
      "Icelandic Króna"
    ],
    [
      "JEP",
      "Jersey Pound"
    ],
    [
      "JMD",
      "Jamaican Dollar"
    ],
    [
      "JOD",
      "Jordanian Dinar"
    ],
    [
      "JPY",
      "Japanese Yen"
    ],
    [
      "KES",
      "Kenyan Shilling"
    ],
    [
      "KGS",
      "Kyrgyzstani Som"
    ],
    [
      "KHR",
      "Cambodian Riel"
    ],
    [
      "KID",
      "Kiribati Dollar"
    ],
    [
      "KMF",
      "Comorian Franc"
    ],
    [
      "KRW",
      "South Korean Won"
    ],
    [
      "KWD",
      "Kuwaiti Dinar"
    ],
    [
      "KYD",
      "Cayman Islands Dollar"
    ],
    [
      "KZT",
      "Kazakhstani Tenge"
    ],
    [
      "LAK",
      "Lao Kip"
    ],
    [
      "LBP",
      "Lebanese Pound"
    ],
    [
      "LKR",
      "Sri Lanka Rupee"
    ],
    [
      "LRD",
      "Liberian Dollar"
    ],
    [
      "LSL",
      "Lesotho Loti"
    ],
    [
      "LYD",
      "Libyan Dinar"
    ],
    [
      "MAD",
      "Moroccan Dirham"
    ],
    [
      "MDL",
      "Moldovan Leu"
    ],
    [
      "MGA",
      "Malagasy Ariary"
    ],
    [
      "MKD",
      "Macedonian Denar"
    ],
    [
      "MMK",
      "Burmese Kyat"
    ],
    [
      "MNT",
      "Mongolian Tögrög"
    ],
    [
      "MOP",
      "Macanese Pataca"
    ],
    [
      "MRU",
      "Mauritanian Ouguiya"
    ],
    [
      "MUR",
      "Mauritian Rupee"
    ],
    [
      "MVR",
      "Maldivian Rufiyaa"
    ],
    [
      "MWK",
      "Malawian Kwacha"
    ],
    [
      "MXN",
      "Mexican Peso"
    ],
    [
      "MYR",
      "Malaysian Ringgit"
    ],
    [
      "MZN",
      "Mozambican Metical"
    ],
    [
      "NAD",
      "Namibian Dollar"
    ],
    [
      "NGN",
      "Nigerian Naira"
    ],
    [
      "NIO",
      "Nicaraguan Córdoba"
    ],
    [
      "NOK",
      "Norwegian Krone"
    ],
    [
      "NPR",
      "Nepalese Rupee"
    ],
    [
      "NZD",
      "New Zealand Dollar"
    ],
    [
      "OMR",
      "Omani Rial"
    ],
    [
      "PAB",
      "Panamanian Balboa"
    ],
    [
      "PEN",
      "Peruvian Sol"
    ],
    [
      "PGK",
      "Papua New Guinean Kina"
    ],
    [
      "PHP",
      "Philippine Peso"
    ],
    [
      "PKR",
      "Pakistani Rupee"
    ],
    [
      "PLN",
      "Polish Złoty"
    ],
    [
      "PYG",
      "Paraguayan Guaraní"
    ],
    [
      "QAR",
      "Qatari Riyal"
    ],
    [
      "RON",
      "Romanian Leu"
    ],
    [
      "RSD",
      "Serbian Dinar"
    ],
    [
      "RUB",
      "Russian Ruble"
    ],
    [
      "RWF",
      "Rwandan Franc"
    ],
    [
      "SAR",
      "Saudi Riyal"
    ],
    [
      "SBD",
      "Solomon Islands Dollar"
    ],
    [
      "SCR",
      "Seychellois Rupee"
    ],
    [
      "SDG",
      "Sudanese Pound"
    ],
    [
      "SEK",
      "Swedish Krona"
    ],
    [
      "SGD",
      "Singapore Dollar"
    ],
    [
      "SHP",
      "Saint Helena Pound"
    ],
    [
      "SLE",
      "Sierra Leonean Leone"
    ],
    [
      "SLL",
      "Sierra Leonean Leone"
    ],
    [
      "SOS",
      "Somali Shilling"
    ],
    [
      "SRD",
      "Surinamese Dollar"
    ],
    [
      "SSP",
      "South Sudanese Pound"
    ],
    [
      "STN",
      "São Tomé and Príncipe Dobra"
    ],
    [
      "SYP",
      "Syrian Pound"
    ],
    [
      "SZL",
      "Eswatini Lilangeni"
    ],
    [
      "THB",
      "Thai Baht"
    ],
    [
      "TJS",
      "Tajikistani Somoni"
    ],
    [
      "TMT",
      "Turkmenistan Manat"
    ],
    [
      "TND",
      "Tunisian Dinar"
    ],
    [
      "TOP",
      "Tongan Paʻanga"
    ],
    [
      "TRY",
      "Turkish Lira"
    ],
    [
      "TTD",
      "Trinidad and Tobago Dollar"
    ],
    [
      "TVD",
      "Tuvaluan Dollar"
    ],
    [
      "TWD",
      "New Taiwan Dollar"
    ],
    [
      "TZS",
      "Tanzanian Shilling"
    ],
    [
      "UAH",
      "Ukrainian Hryvnia"
    ],
    [
      "UGX",
      "Ugandan Shilling"
    ],
    [
      "USD",
      "United States Dollar"
    ],
    [
      "UYU",
      "Uruguayan Peso"
    ],
    [
      "UZS",
      "Uzbekistani So'm"
    ],
    [
      "VES",
      "Venezuelan Bolívar Soberano"
    ],
    [
      "VND",
      "Vietnamese Đồng"
    ],
    [
      "VUV",
      "Vanuatu Vatu"
    ],
    [
      "WST",
      "Samoan Tālā"
    ],
    [
      "XAF",
      "Central African CFA Franc"
    ],
    [
      "XCD",
      "East Caribbean Dollar"
    ],
    [
      "XDR",
      "Special Drawing Rights"
    ],
    [
      "XOF",
      "West African CFA franc"
    ],
    [
      "XPF",
      "CFP Franc"
    ],
    [
      "YER",
      "Yemeni Rial"
    ],
    [
      "ZAR",
      "South African Rand"
    ],
    [
      "ZMW",
      "Zambian Kwacha"
    ],
    [
      "ZWL",
      "Zimbabwean Dollar"
    ]
  ]
};