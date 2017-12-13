import React, {Component} from 'react';
import {Text, View, TouchableOpacity, ListView, ScrollView} from 'react-native';
import LoadingView from '../components/LoadingView';
import AppSettings from '../config/AppSettings';
import {observable} from 'mobx';
import {observer} from 'mobx-react/native';
import styles from './styles/MainPageStyle';
import NavigationStyle from './styles/NavigationStyle';
import GlobalStore from '../store/globalStore';
import ContainerRowView from '../components/ContainerRowView';
import I18n from '../config/I18n';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

@observer
export default class MainPage extends React.Component {

  static navigatorButtons = {
    rightButtons: [{
      title: I18n.t('rightNavButtonTitle'),
      id: 'settingsPageID'
    }]
  };

  @observable cryptocurrencyList = null;
  @observable goNextTitle = "";
  @observable selectedFiatCurrency = '';
  @observable cannotConnect = false;
  
  constructor (props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    this.selectedFiatCurrency = GlobalStore.currentlySelectedCurrency;
    this.fetchData();
  }

  onNavigatorEvent(event) {
    if (event && event.type == 'NavBarButtonPress' && event.id == 'settingsPageID') {
      this.goNext(null);
    } else if (event && event.type == 'ScreenChangedEvent' && event.id == 'willAppear') {
      if(this.selectedFiatCurrency && this.selectedFiatCurrency != GlobalStore.currentlySelectedCurrency){
        this.selectedFiatCurrency = GlobalStore.currentlySelectedCurrency;
        this.fetchData();
      }    
    }
  }

  renderRow(cryptocurrency) {
    return (
      <ContainerRowView
        onPress={() => this.goNext(cryptocurrency)}
        insideElement={this.renderContent(cryptocurrency)}
      />
    )
  }

  renderContent(cryptocurrency) {
    return (
      <View style={styles.listRowContentContainer}>
        <Text style={styles.textRowStyle}>{cryptocurrency.rank}</Text>
        <Text style={styles.textRowStyle}>{cryptocurrency.symbol}</Text>
        {this.priceInSelectedFiat(cryptocurrency)}
        <Text style={styles.textRowStyle}>{I18n.t('mainPageChange24h')} {cryptocurrency.percent_change_24h}</Text>
    </View>
    )
  }

  priceInSelectedFiat(cryptocurrency) {
    return (
      <Text style={styles.textRowStyle}>{this.shorterDecimalPrice(cryptocurrency['price_'+this.selectedFiatCurrency.toLowerCase()])} {AppSettings.availableCurrencies[this.selectedFiatCurrency].symbol}</Text>
    )
  }

  shorterDecimalPrice(num) {
    return Number(num).toFixed(4);
  }

  fetchData() {
    this.cryptocurrencyList = null;
    fetch(AppSettings.coinMarketCapHost+'?convert='+this.selectedFiatCurrency)
      .then((res) => {
        if(res.status != 200) {
          this.cannotConnect = true;
          return;
        }
        return res.json()})
      .then((resJson) => {
        this.cannotConnect = false;
        this.cryptocurrencyList = ds.cloneWithRows(resJson);
      })
      .catch((error) => {this.cannotConnect = true;})
  }

  goNext(cryptocurrency) {
    this.goNextTitle = cryptocurrency ? cryptocurrency.rank+" - "+cryptocurrency.name+" ("+cryptocurrency.symbol+")" : I18n.t('settingsPageTitle');
    var cryptoId = cryptocurrency ? cryptocurrency.id : null;
    this.props.navigator.push({
      screen: cryptocurrency ? 'testassignment.CryptocurrencyDetails' : 'testassignment.SettingsPage',
      title: this.goNextTitle,
      passProps: {cryptoId},
      animated: true,
      animationType: 'slide-right',
      backButtonTitle: "",
      backButtonHidden: false,
      navigatorStyle: NavigationStyle.navBarButtonColor
    });
  }

  render () {
    return (
      <View style={ styles.container }>
        <ScrollView ref='_scrollView' automaticallyAdjustContentInsets={false} scrollEventThrottle={200}>
          {this.cannotConnect
            ?
            <View style={styles.cannotConnectContainer}>
              <Text style={styles.textRowStyle}>{I18n.t('mainPageCannotConnect')}</Text>
            </View>
            :
            (!this.cryptocurrencyList
              ?
              <LoadingView/>
              :
              <ListView
                keyboardShouldPersistTaps="always"
                ref={listView => this._listView = listView}
                dataSource={this.cryptocurrencyList}
                renderRow={(cryptocurrency) => this.renderRow(cryptocurrency)}
                initialListSize={30}
                pageSize={15}
                style={styles.listViewContainer}
              />
            )
          }
        </ScrollView>
  
        <TouchableOpacity 
          style={styles.buttonContainer} 
          onPress={() => {this.fetchData();}}
          disabled={this.cryptocurrencyList || this.cannotConnect ? false : true}
          > 
          <Text style={styles.textButtonStyle}>{I18n.t('mainPageBottomButtonText')}</Text>
        </TouchableOpacity>

      </View>
    );
  }

}
