export default class CurrencyExchange {
  static async getSupportedCurrencies() {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/codes`);
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