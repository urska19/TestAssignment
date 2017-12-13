import {AppRegistry} from 'react-native';
import MainPage from './app/containers/MainPage';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './app/containers';
import NavigationStyle from './app/containers/styles/NavigationStyle';
import I18n from './app/config/I18n';

registerScreens();

Navigation.startSingleScreenApp({
  screen: 
    {
      label: 'MainPage',
      screen: 'testassignment.MainPage',
      title: I18n.t('mainPageTitle'),
      navigatorStyle: NavigationStyle.navBarButtonColor,
    }
	});

AppRegistry.registerComponent('TestAssignment', () => MainPage);
