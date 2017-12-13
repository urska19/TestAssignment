import {Navigation} from 'react-native-navigation';
import MainPage from './MainPage';
import CryptocurrencyDetails from './CryptocurrencyDetails';
import SettingsPage from './SettingsPage';

export function registerScreens() {
  Navigation.registerComponent('testassignment.MainPage', () => MainPage);
  Navigation.registerComponent('testassignment.CryptocurrencyDetails', () => CryptocurrencyDetails);
  Navigation.registerComponent('testassignment.SettingsPage', () => SettingsPage);
}