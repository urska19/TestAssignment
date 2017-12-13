import {observable} from 'mobx';
import AppSettings from '../config/AppSettings';

class GlobalStore {
	@observable currentlySelectedCurrency = AppSettings.defaultCurrency;
}

export default GlobalStore = new GlobalStore();