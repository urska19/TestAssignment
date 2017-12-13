import React, {Component} from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import LoadingView from '../components/LoadingView';
import AppSettings from '../config/AppSettings';
import {observable} from 'mobx';
import {observer} from 'mobx-react/native';
import styles from './styles/CryptocurrencyDetailsStyle';
import GlobalStore from '../store/globalStore';
import NavigationStyle from './styles/NavigationStyle';
import I18n from '../config/I18n';

@observer
export default class CryptocurrencyDetails extends React.Component {

  static navigatorButtons = {
    rightButtons: [{
      title: I18n.t('rightNavButtonTitle'),
      id: 'settingsPageID'
    }]
  };

  @observable currentCrypto = null;
  @observable selectedFiatCurrency = '';
  @observable cannotConnect = false;

  constructor (props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event && event.type == 'NavBarButtonPress' && event.id == 'settingsPageID') {
      this.goNext();
    } else if (event && event.type == 'ScreenChangedEvent' && event.id == 'willAppear') {
      if(this.selectedFiatCurrency && this.selectedFiatCurrency != GlobalStore.currentlySelectedCurrency){
        this.selectedFiatCurrency = GlobalStore.currentlySelectedCurrency;
        this.fetchData();
      } 
    }
  }

  goNext(cryptocurrency) {
    this.props.navigator.push({
      screen: 'testassignment.SettingsPage',
      title: I18n.t('settingsPageTitle'),
      passProps: {},
      animated: true,
      animationType: 'slide-right',
      backButtonTitle: "",
      backButtonHidden: false,
      navigatorStyle: NavigationStyle.navBarButtonColor,
      navigatorButtons: {},
    });
  }

  componentDidMount() {
    this.selectedFiatCurrency = AppSettings.defaultCurrency;
    this.fetchData();
  }

  fetchData() {
    this.currentCrypto = null;
    fetch(AppSettings.coinMarketCapHost+this.props.cryptoId+'/?convert='+this.selectedFiatCurrency)
      .then((res) => {
        if(res.status != 200) {
          this.cannotConnect = true;
          return;
        }
        return res.json()})
      .then((resJson) => {
        this.cannotConnect = false;
        this.currentCrypto = resJson[0];
      })
      .catch((error) => {this.cannotConnect = true;})
  }

  render () {
    return (
      <View style={styles.container}>  


        <ScrollView ref='_scrollView' automaticallyAdjustContentInsets={false} scrollEventThrottle={200}>
        {this.cannotConnect
          ?
          <View style={styles.cannotConnectContainer}>
            <Text style={styles.textRowStyle}>{I18n.t('cryptoDetailsPageCannotConnect')}</Text>
          </View>
          :
          (!this.currentCrypto
            ?
            <LoadingView/>
            :        
            <View style={styles.contentContainer}>
              <View style={styles.textRowTitle}>
                <Text style={styles.textTitleStyle}>{I18n.t('cryptoDetailsPagePrice')}</Text>
              </View>
              <View style={styles.textRowDetails}>
                <Text style={styles.textDetailsStyle}>{I18n.t('cryptoDetailsPageBTC')}</Text>
                <Text style={styles.textDetailsStyle}>{this.selectedFiatCurrency}</Text>
              </View>
              <View style={styles.textRowDetails}>
                <Text style={styles.textDetailsStyle}>{this.currentCrypto.price_btc}</Text>
                <Text style={styles.textDetailsStyle}>{this.currentCrypto['price_'+this.selectedFiatCurrency.toLowerCase()]}</Text>
              </View>
          
              <View style={styles.textRowTitle}>
                <Text style={styles.textTitleStyle}>{I18n.t('cryptoDetailsPageChange')}</Text>
              </View>
              <View style={styles.textRowDetails}>
                <Text style={styles.textDetailsStyle}>{I18n.t('cryptoDetailsPageChange1h')}</Text>
                <Text style={styles.textDetailsStyle}>{I18n.t('cryptoDetailsPageChange24h')}</Text>
                <Text style={styles.textDetailsStyle}>{I18n.t('cryptoDetailsPageChange7d')}</Text>
              </View>
              <View style={styles.textRowDetails}>
                <Text style={styles.textDetailsStyle}>{this.currentCrypto.percent_change_1h}</Text>
                <Text style={styles.textDetailsStyle}>{this.currentCrypto.percent_change_24h}</Text>
                <Text style={styles.textDetailsStyle}>{this.currentCrypto.percent_change_7d}</Text>
              </View>

              <View style={styles.textRowTitle}>
                <Text style={styles.textTitleStyle}>{I18n.t('cryptoDetailsPageSupply')}</Text>
              </View>
              <View style={styles.textRowDetails}>
                <Text style={styles.textDetailsStyle}>{I18n.t('cryptoDetailsPageSupplyAvailable')}</Text>
                <Text style={styles.textDetailsStyle}>{I18n.t('cryptoDetailsPageSupplyMax')}</Text>
              </View>
              <View style={styles.textRowDetails}>
                <Text style={styles.textDetailsStyle}>{this.currentCrypto.available_supply}</Text>
                <Text style={styles.textDetailsStyle}>{this.currentCrypto.max_supply ?  this.currentCrypto.max_supply : I18n.t('cryptoDetailsPageDataNotAvailable')}</Text>
              </View>

              <View style={styles.textRowTitle}>
                <Text style={styles.textTitleStyle}>{I18n.t('cryptoDetailsPageVolume')}</Text>
              </View>
              <View style={[styles.textRowDetails, {justifyContent: 'center'}]}>
                <Text style={styles.textDetailsStyle}>{I18n.t('cryptoDetailsPageChange24h')} ({this.selectedFiatCurrency})</Text>
              </View>
              <View style={[styles.textRowDetails, {justifyContent: 'center'}]}>
                <Text style={styles.textDetailsStyle}>{this.currentCrypto['24h_volume_'+this.selectedFiatCurrency.toLowerCase()]}</Text>
              </View>

              <View style={styles.textRowTitle}>
                <Text style={styles.textTitleStyle}>{I18n.t('cryptoDetailsPageMarketCap')}</Text>
              </View>
              <View style={[styles.textRowDetails, {justifyContent: 'center'}]}>
                <Text style={styles.textDetailsStyle}>{this.selectedFiatCurrency}</Text>
              </View>
              <View style={[styles.textRowDetails, {justifyContent: 'center'}]}>
                <Text style={styles.textDetailsStyle}>{this.currentCrypto['market_cap_'+this.selectedFiatCurrency.toLowerCase()]}</Text>
              </View>
            </View>
          )
        }
        </ScrollView>

        <TouchableOpacity 
          style={styles.buttonContainer} 
          onPress={() => {this.fetchData();}}
          disabled={this.currentCrypto || this.cannotConnect ? false : true}
          > 
          <Text style={styles.textButtonStyle}>{I18n.t('cryptoDetailsPageBottomButtonText')}</Text>
        </TouchableOpacity>

      </View>
    );
  }

}
