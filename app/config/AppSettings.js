
const apiAddresses = {
  'coinMarketCapHost': 'https://api.coinmarketcap.com/v1/ticker/'
}

const availableCurrencies = {
	'USD' : {symbol: '$', acronym: 'USD', name: 'US Dollar'},
	'EUR' : {symbol: '€', acronym: 'EUR', name: 'Euro'},
	'CNY' : {symbol: '¥', acronym: 'CNY', name: 'Chinese Yuan'},
}

const settings = {
  ...apiAddresses,
  availableCurrencies,
  defaultCurrency: 'EUR'
}

export default settings;