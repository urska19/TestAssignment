import I18n from 'react-native-i18n';

I18n.fallbacks = true;

I18n.translations = {
	en: {
		mainPageTitle: 'Cryptocurrencies',
		mainPageChange24h: '∆ 24h:',
		mainPageBottomButtonText: 'Refresh',
		mainPageCannotConnect: 'Cannot connect to server. Please try again in a couple of minutes.',
		cryptoDetailsPageBTC: 'BTC',
		cryptoDetailsPagePrice: 'Price',
		cryptoDetailsPageChange: 'Change',
		cryptoDetailsPageChange1h: '1 hour',
		cryptoDetailsPageChange24h: '24 hours',
		cryptoDetailsPageChange7d: '7 days',
		cryptoDetailsPageSupply: 'Supply',		
		cryptoDetailsPageSupplyAvailable: 'Available',
		cryptoDetailsPageSupplyMax: 'Max',
		cryptoDetailsPageBottomButtonText: 'Refresh',
		cryptoDetailsPageDataNotAvailable: '-',
		cryptoDetailsPageVolume: 'Volume',
		cryptoDetailsPageMarketCap: 'Market Cap',
		cryptoDetailsPageCannotConnect: 'Cannot connect to server. Please try again in a couple of minutes.',
		settingsPageTitle: 'Settings',
		rightNavButtonTitle: 'Settings',
	}
}
export default I18n;