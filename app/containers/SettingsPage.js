import React, {Component} from 'react';
import {Text, View, TouchableOpacity, ListView, ScrollView} from 'react-native';
import ContainerRowView from '../components/ContainerRowView';
import AppSettings from '../config/AppSettings';
import {observable} from 'mobx';
import { observer } from 'mobx-react/native';
import styles from './styles/SettingsPageStyle';
import GlobalStore from '../store/globalStore';

@observer
export default class SettingsPage extends React.Component {
  
  constructor (props) {
    super(props);
  }

  currencyList() {
    var list = [];
    for(var item in AppSettings.availableCurrencies) {
      list.push(this.currencyListElement(item, AppSettings.availableCurrencies[item]))
    }
    return (
      list
    );
  }

  currencyListElement(key, item) {
    return (
      <ContainerRowView
        key={key}
        listRowContainerStyle={[styles.listRowContainerStyle, {backgroundColor: key == GlobalStore.currentlySelectedCurrency ? 'yellow' : 'white'}]}
        onPress={(text) => {GlobalStore.currentlySelectedCurrency = key}}
        insideElement={this.renderTextComponent(key, item)}
      />
    )
  }

  renderTextComponent(key, item) {
    return (
      <Text style={styles.textStyle}>{item.name}</Text>
    )
  }

  render () {
    this.currencyList()
    return (
      <View style={styles.container}> 
        <View style={styles.innerContainer}> 
          {this.currencyList()}
        </View>
      </View>
    );
  }

}
