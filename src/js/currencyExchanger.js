export default class CurrencyExchange {
  static async getExchangeRates() {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/e15c41ceb3769636ce569121/codes`); // <-- change 'USD' to another variable to be able to get exchange rates between any two currencies, not just USD to X.
      // to conver between any two specific currencies use: https://v6.exchangerate-api.com/v6/${API_KEY}/pair/USD/GBP.  change USD and GBP to variables which will be gathered from user input to exchange between any two variables.

      const jsonifiedResponse = await response.json();
      if (!response.result === 'success') {
        const errorMessage = `${response.result} ${response['error-type']}`;
        throw new Error(errorMessage);
      }
      return jsonifiedResponse;
    } catch (error) {
      return error;
    }
  }
  static async getExchangeAmount(convertFrom, convertTo, amount) {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${convertFrom}/${convertTo}/${amount}`);
      const jsonifiedResponse = await response.json();
      if (!response.ok) {
        let errorMessage = `${response.status}. Reason:${response.statusText} ${jsonifiedResponse['error-type']}.`;
        if (jsonifiedResponse['extra-info']) {
          errorMessage = errorMessage.concat(` ${jsonifiedResponse['extra-info']}`);
        }
        throw new Error(errorMessage);
      }
      return jsonifiedResponse;
    } catch (error) {
      return error;
    }
  }
}